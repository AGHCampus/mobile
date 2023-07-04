import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
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
import {
    getEventDatetimeRangeString,
    getEventDatetimeStringLong,
} from '../../utils/time';
import { VerticalSpacer } from '../Spacers';
import { Shadows } from '../../lib/Shadows';
import { LatLng } from 'react-native-maps';
import EventButtonRow from './EventButtonRow';
import EventLocation from './EventLocation';

export interface EventData {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    locationName: string;
    startTime: Date;
    endTime?: Date;
    websiteUrl?: string;
    locationCoordinate?: LatLng;
    locationLogoUrl?: string;
}

interface Props {
    event: EventData;
}

enum AnimationState {
    IDLE,
    EXPANDING,
    COLLAPSING,
}

// @ts-ignore TS reports an error, but it works fine 🤷‍♂️
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export default function EventTile({ event }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [animationStatus, setAnimationStatus] = useState(AnimationState.IDLE);
    const [expandHeight, setExpandHeight] = useState(0);
    const animationState = useSharedValue(0);
    const tileWidth =
        Dimensions.get('window').width - 2 * Constants.SPACING_UNIT_24;

    const animateFocus = () => {
        setAnimationStatus(AnimationState.EXPANDING);
        setIsCollapsed(false);
        animationState.value = withTiming(1, { duration: 500 }, () => {
            runOnJS(setAnimationStatus)(AnimationState.IDLE);
        });
    };

    const animateBlur = () => {
        setAnimationStatus(AnimationState.COLLAPSING);
        animationState.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(setIsCollapsed)(true);
            runOnJS(setAnimationStatus)(AnimationState.IDLE);
        });
    };

    const eventTileStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animationState.value,
                [0, 1],
                [120, 240 + expandHeight],
            ),
        };
    }, [animationState.value, expandHeight]);

    const eventImageStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(
                animationState.value,
                [0, 1],
                [0.4 * tileWidth, tileWidth],
            ),
            height: interpolate(animationState.value, [0, 1], [120, 240]),
            borderBottomLeftRadius: interpolate(
                animationState.value,
                [0, 1],
                [16, 0],
            ),
            borderTopRightRadius: interpolate(
                animationState.value,
                [0, 1],
                [0, 16],
            ),
        };
    }, [animationState.value]);

    const eventInfoExpandedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animationState.value,
                [0, 0.5, 0.75, 0.9, 1],
                [0, 0, 0.2, 0.4, 1],
            ),
            marginHorizontal: Constants.SPACING_UNIT_8,
        };
    }, [animationState.value]);

    const {
        name,
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
                style={[eventTileStyle, styles.eventContainer, Shadows.depth2]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (animationStatus === AnimationState.IDLE) {
                            isCollapsed ? animateFocus() : animateBlur();
                        }
                    }}>
                    <View style={styles.row}>
                        <AnimatedFastImage
                            style={[eventImageStyle, styles.imageStaticBorder]}
                            source={{ uri: imageUrl }}
                        />
                        {!isCollapsed ||
                        animationStatus === AnimationState.EXPANDING ? null : (
                            <Animated.View
                                entering={FadeInRight.duration(200)}
                                exiting={FadeOutRight.duration(200)}
                                style={styles.collapsedEventDetails}>
                                <VerticalSpacer
                                    height={Constants.SPACING_UNIT_16}
                                />
                                <Text style={styles.time}>
                                    {endTime
                                        ? getEventDatetimeRangeString(
                                              startTime,
                                              endTime,
                                          )
                                        : getEventDatetimeStringLong(startTime)}
                                </Text>
                                <VerticalSpacer
                                    height={Constants.SPACING_UNIT_8}
                                />
                                <Text style={styles.eventName}>{name}</Text>
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
                        style={eventInfoExpandedStyle}
                        exiting={FadeOutUp.duration(200)}>
                        <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                        <Text style={styles.time}>
                            {endTime
                                ? getEventDatetimeRangeString(
                                      startTime,
                                      endTime,
                                  )
                                : getEventDatetimeStringLong(startTime)}
                        </Text>
                        <Text style={styles.eventName}>{name}</Text>
                        <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                        <Text>{description}</Text>
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
        borderRadius: Constants.SPACING_UNIT_16,
        backgroundColor: Colors.bgWhite,
        marginHorizontal: 24,
        flex: 1,
    },

    time: {
        fontWeight: '200',
        fontSize: 12,
        lineHeight: 14,
    },

    eventName: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
    },

    eventDescription: {
        fontSize: 14,
        lineHeight: 16,
    },

    row: {
        flexDirection: 'row',
    },

    flexOne: {
        flex: 1,
    },

    collapsedEventDetails: {
        marginLeft: Constants.SPACING_UNIT_8,
    },

    imageStaticBorder: {
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 0,
    },
});
