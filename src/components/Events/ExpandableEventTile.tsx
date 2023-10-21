import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
    FadeInRight,
    FadeOutRight,
    FadeOutUp,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import EventButtonRow from './EventButtonRow';
import EventLocation from './EventLocation';
import Icon from '../Icon';
import { VerticalSpacer } from '../Spacers';
import {
    getEventDatetimeRangeString,
    getEventDatetimeStringLong,
} from '../../utils/time';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { Shadows } from '../../lib/Shadows';
import { EventData } from '../../lib/MockedData';
import { AppDimensionsContext } from '../../../App';

interface Props {
    event: EventData;
    collapsed?: boolean;
}

enum AnimationState {
    IDLE,
    EXPANDING,
    COLLAPSING,
}

// @ts-ignore TS reports an error, but it works fine 🤷‍♂️
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export default function EventTile({ event, collapsed = true }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [animationStatus, setAnimationStatus] = useState(AnimationState.IDLE);
    const [expandHeight, setExpandHeight] = useState(0);
    const animationState = useSharedValue(collapsed ? 0 : 1);
    const dimensions = useContext(AppDimensionsContext);
    const tileWidth = dimensions.width - 2 * Constants.SPACING_UNIT_16;

    const animateFocus = () => {
        setAnimationStatus(AnimationState.EXPANDING);
        setIsCollapsed(false);
        animationState.value = withTiming(1, { duration: 400 }, () => {
            runOnJS(setAnimationStatus)(AnimationState.IDLE);
        });
    };

    const animateBlur = () => {
        setAnimationStatus(AnimationState.COLLAPSING);
        animationState.value = withTiming(0, { duration: 400 }, () => {
            runOnJS(setIsCollapsed)(true);
            runOnJS(setAnimationStatus)(AnimationState.IDLE);
        });
    };

    const eventTileAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animationState.value,
                [0, 1],
                [100, (2 / 3) * tileWidth + expandHeight],
            ),
        };
    }, [animationState.value, expandHeight]);

    const eventImageAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(animationState.value, [0, 1], [150, tileWidth]),
            borderBottomLeftRadius: interpolate(
                animationState.value,
                [0, 1],
                [Constants.BORDER_RADIUS_MEDIUM, 0],
            ),
            borderTopRightRadius: interpolate(
                animationState.value,
                [0, 1],
                [0, Constants.BORDER_RADIUS_MEDIUM],
            ),
        };
    }, [animationState.value]);

    const eventInfoExpandedAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animationState.value,
                [0, 0.5, 0.75, 0.9, 1],
                [0, 0, 0.2, 0.4, 1],
            ),
        };
    }, [animationState.value]);

    const {
        title,
        imageUrl,
        description,
        websiteUrl,
        startTime,
        endTime,
        locationName,
        locationCoordinate,
        locationLogoUrl,
    } = event;

    return (
        <View>
            <EventLocation
                name={locationName}
                logoUrl={locationLogoUrl}
                coordinate={locationCoordinate}
            />
            <Animated.View
                style={[
                    eventTileAnimatedStyle,
                    styles.eventContainer,
                    Shadows.depth2,
                ]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (animationStatus === AnimationState.IDLE) {
                            isCollapsed ? animateFocus() : animateBlur();
                        }
                    }}>
                    <View style={[styles.row, { width: tileWidth }]}>
                        <AnimatedFastImage
                            style={[eventImageAnimatedStyle, styles.image]}
                            source={{ uri: imageUrl }}
                        />
                        {!isCollapsed ||
                        animationStatus === AnimationState.EXPANDING ? null : (
                            <Animated.View
                                entering={FadeInRight.duration(150)}
                                exiting={FadeOutRight.duration(150)}
                                style={[styles.collapsedEventDetails]}>
                                <View style={styles.columnCenter}>
                                    <Text style={styles.time}>
                                        {endTime
                                            ? getEventDatetimeRangeString(
                                                  startTime,
                                                  endTime,
                                              )
                                            : getEventDatetimeStringLong(
                                                  startTime,
                                              )}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.eventTitle,
                                            { width: tileWidth - 194 },
                                        ]}>
                                        {title}
                                    </Text>
                                </View>
                                <View style={[styles.columnCenter]}>
                                    <Icon
                                        asset={'AngleDown'}
                                        color={Colors.gray}
                                        style={[styles.icon]}
                                    />
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                {isCollapsed ||
                animationStatus === AnimationState.COLLAPSING ? null : (
                    <Animated.View
                        onLayout={e => {
                            const { height } = e.nativeEvent.layout;
                            if (height > expandHeight) {
                                setExpandHeight(height);
                            }
                        }}
                        style={[
                            eventInfoExpandedAnimatedStyle,
                            styles.eventInfoExpandedStyle,
                        ]}
                        exiting={FadeOutUp.duration(150)}>
                        <VerticalSpacer height={Constants.SPACING_UNIT_10} />
                        <Text style={styles.time}>
                            {endTime
                                ? getEventDatetimeRangeString(
                                      startTime,
                                      endTime,
                                  )
                                : getEventDatetimeStringLong(startTime)}
                        </Text>
                        <Text style={styles.eventTitle}>{title}</Text>
                        <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                        <Text style={styles.eventDescription}>
                            {description}
                        </Text>
                        <VerticalSpacer height={Constants.SPACING_UNIT_16} />
                        {/* TODO: Proper sharing */}
                        <EventButtonRow
                            url={websiteUrl}
                            shareContent={{ message: 'test' }}
                        />
                        <VerticalSpacer height={Constants.SPACING_UNIT_16} />
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    eventContainer: {
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        backgroundColor: Colors.bgWhite,
        marginHorizontal: Constants.SPACING_UNIT_16,
        flex: 1,
    },

    time: {
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 16,
        color: Colors.textGray,
    },

    eventTitle: {
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 20,
    },

    eventDescription: {
        fontWeight: '300',
        fontSize: 15,
        lineHeight: 18,
    },

    row: {
        flexDirection: 'row',
    },

    flexOne: {
        flex: 1,
    },

    collapsedEventDetails: {
        flexDirection: 'row',
        gap: Constants.SPACING_UNIT_8,
        paddingLeft: Constants.SPACING_UNIT_8,
    },

    columnCenter: {
        display: 'flex',
        justifyContent: 'center',
    },

    icon: {
        width: 16,
        height: 16,
    },

    eventInfoExpandedStyle: {
        marginHorizontal: Constants.SPACING_UNIT_16,
    },

    image: {
        aspectRatio: 3 / 2,
        borderTopLeftRadius: Constants.BORDER_RADIUS_MEDIUM,
        borderBottomRightRadius: 0,
    },
});
