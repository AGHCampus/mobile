import React, { useState, useContext } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
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
import { EventData } from '../../api/events';
import { LocationData } from '../../api/locations';
import { AppDimensionsContext } from '../../../App';
import { getEventShareText } from '../../utils/sharing';

const IMAGE_WIDTH =
    (Dimensions.get('window').width - 2 * Constants.SPACING_UNIT_8) / 2;
const FADE_DURATION = 150;
const BLUR_DURATION = 400;

interface Props {
    location: LocationData;
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

export default function EventTile({
    location,
    event,
    collapsed = true,
}: Props) {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [animationStatus, setAnimationStatus] = useState(AnimationState.IDLE);
    const [expandHeight, setExpandHeight] = useState(0);
    const animationState = useSharedValue(collapsed ? 0 : 1);
    const dimensions = useContext(AppDimensionsContext);
    const tileWidth = dimensions.width - 2 * Constants.SPACING_UNIT_10;

    const animateFocus = () => {
        setAnimationStatus(AnimationState.EXPANDING);
        setIsCollapsed(false);
        animationState.value = withTiming(
            1,
            { duration: BLUR_DURATION },
            () => {
                runOnJS(setAnimationStatus)(AnimationState.IDLE);
            },
        );
    };

    const animateBlur = () => {
        setAnimationStatus(AnimationState.COLLAPSING);
        animationState.value = withTiming(
            0,
            { duration: BLUR_DURATION },
            () => {
                runOnJS(setIsCollapsed)(true);
                runOnJS(setAnimationStatus)(AnimationState.IDLE);
            },
        );
    };

    const eventTileAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animationState.value,
                [0, 1],
                [(2 / 3) * IMAGE_WIDTH, (2 / 3) * tileWidth + expandHeight],
            ),
        };
    }, [animationState.value, expandHeight]);

    const eventImageAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(
                animationState.value,
                [0, 1],
                [IMAGE_WIDTH, tileWidth],
            ),
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

    const { title, imageUrl, description, websiteUrl, startDate, endDate } =
        event;

    const startTime = new Date(startDate);
    const endTime = endDate ? new Date(endDate) : null;

    return (
        <View>
            <EventLocation
                name={location.name}
                coordinate={location.coordinate}
                logoUrl={location.logoUrl}
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
                                entering={FadeInRight.duration(FADE_DURATION)}
                                exiting={FadeOutRight.duration(FADE_DURATION)}
                                style={styles.collapsedEventDetails}>
                                <View
                                    style={[
                                        styles.columnCenter,
                                        styles.collapsedEventTitle,
                                    ]}>
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
                                        style={styles.eventTitle}
                                        numberOfLines={3}>
                                        {title}
                                    </Text>
                                </View>
                                <View style={styles.angleDownContainer}>
                                    <Icon
                                        asset={'AngleDown'}
                                        color={Colors.gray}
                                        style={styles.icon}
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
                        exiting={FadeOutUp.duration(FADE_DURATION)}>
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
                        <EventButtonRow
                            url={websiteUrl}
                            shareContent={getEventShareText(event, location)}
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
        marginHorizontal: Constants.SPACING_UNIT_10,
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
        color: Colors.black,
    },

    eventDescription: {
        fontWeight: '300',
        fontSize: 15,
        lineHeight: 18,
        color: Colors.black,
    },

    row: {
        flexDirection: 'row',
    },

    collapsedEventDetails: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: Constants.SPACING_UNIT_8,
    },

    collapsedEventTitle: {
        width:
            Dimensions.get('window').width -
            IMAGE_WIDTH -
            // margin + spacers
            2 * Constants.SPACING_UNIT_8 -
            2 * Constants.SPACING_UNIT_10,
    },

    columnCenter: {
        flex: 1,
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

    angleDownContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 10,
        paddingBottom: 16,
    },
});
