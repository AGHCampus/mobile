import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import Animated, {
    FadeInUp,
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
import { FlexSpacer, VerticalSpacer } from '../Spacers';
import { Shadows } from '../../lib/Shadows';
import { EventData } from './ExpandableEventTile';
import EventButtonRow from './EventButtonRow';
import IconButton from '../IconButton';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    event: EventData;
}

enum AnimationState {
    IDLE,
    EXPANDING,
    COLLAPSING,
}

export default function EventTile({ event }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [animationStatus, setAnimationStatus] = useState(AnimationState.IDLE);
    const [expandHeight, setExpandHeight] = useState(0);
    const animationState = useSharedValue(0);

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
                [260, 260 + expandHeight],
            ),
        };
    }, [animationState.value, expandHeight]);
    const buttonRowStyle = useAnimatedStyle(() => {
        return {
            marginTop: interpolate(
                animationState.value,
                [0, 1],
                [0, expandHeight],
            ),
        };
    }, [animationState.value, expandHeight]);

    const { name, imageUrl, description, websiteUrl, startTime, endTime } =
        event;

    return (
        <View>
            <Animated.View
                style={[eventTileStyle, styles.eventContainer, Shadows.depth2]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (animationStatus === AnimationState.IDLE) {
                            isCollapsed ? animateFocus() : animateBlur();
                        }
                    }}>
                    <FastImage
                        style={styles.image}
                        source={{ uri: imageUrl }}
                    />
                </TouchableWithoutFeedback>
                <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                <View style={styles.eventDetailsContainer}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.time}>
                                {endTime
                                    ? getEventDatetimeRangeString(
                                          startTime,
                                          endTime,
                                      )
                                    : getEventDatetimeStringLong(startTime)}
                            </Text>
                            <Text style={styles.eventName}>{name}</Text>
                        </View>
                        <FlexSpacer />
                        <IconButton
                            asset={isCollapsed ? 'AngleDown' : 'AngleUp'}
                            color={Colors.black}
                            onPress={isCollapsed ? animateFocus : animateBlur}
                        />
                    </View>
                    <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                    {!isCollapsed &&
                        animationStatus !== AnimationState.COLLAPSING && (
                            <Animated.View
                                onLayout={e => {
                                    const { height } = e.nativeEvent.layout;
                                    if (height > expandHeight) {
                                        setExpandHeight(height);
                                    }
                                }}
                                style={styles.detailsTextContainer}
                                entering={FadeInUp.duration(400).delay(200)}
                                exiting={FadeOutUp.duration(250)}>
                                <Text>{description}</Text>
                            </Animated.View>
                        )}
                    <VerticalSpacer height={Constants.SPACING_UNIT_16} />
                    <LinearGradient
                        // TODO: Proper colors
                        colors={
                            !isCollapsed
                                ? ['#00000000', '#00000000']
                                : ['#ffffff00', '#ffffffa0', '#ffffffff']
                        }>
                        {/* TODO: Proper sharing */}
                        <EventButtonRow
                            style={buttonRowStyle}
                            url={websiteUrl}
                            shareContent={{ message: 'test' }}
                        />
                        <VerticalSpacer height={Constants.SPACING_UNIT_16} />
                    </LinearGradient>
                </View>
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

    eventInfo: {
        marginHorizontal: 8,
    },

    row: {
        flexDirection: 'row',
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

    eventDetailsContainer: {
        flex: 1,
        marginHorizontal: Constants.SPACING_UNIT_8,
    },

    detailsTextContainer: { position: 'absolute', top: 50 },

    topRowContainer: {
        height: Constants.SPACING_UNIT_24,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    flexOne: {
        flex: 1,
    },

    collapsedEventDetails: {
        marginLeft: Constants.SPACING_UNIT_8,
    },

    image: {
        height: 120,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
});
