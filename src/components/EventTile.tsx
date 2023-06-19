import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import Animated, {
    FadeInRight,
    FadeInUp,
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
} from '../time';

export interface EventData {
    id: string;
    locationID: string;
    name: string;
    description: string;
    imageUrl: string;
    startTime: Date;
    endTime?: Date;
}

interface Props {
    event: EventData;
}

// @ts-ignore TS reports an error, but it works fine 🤷‍♂️
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export default function EventTile({ event }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [animationStatus, setAnimationStatus] = useState('idle');
    const animationState = useSharedValue(0);
    const tileWidth =
        Dimensions.get('window').width - 2 * Constants.SPACING_UNIT_24;

    const animateFocus = () => {
        setAnimationStatus('expanding');
        animationState.value = withTiming(1, { duration: 500 }, () => {
            runOnJS(setIsCollapsed)(false);
            runOnJS(setAnimationStatus)('idle');
        });
    };

    const animateBlur = () => {
        runOnJS(setAnimationStatus)('collapsing');
        animationState.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(setIsCollapsed)(true);
            runOnJS(setAnimationStatus)('idle');
        });
    };

    const eventTileStyle = useAnimatedStyle(() => {
        return {
            minHeight: interpolate(animationState.value, [0, 1], [120, 360]),
            flex: 1,
        };
    }, [animationState.value]);

    const eventImageStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(
                animationState.value,
                [0, 1],
                [0.4 * tileWidth, tileWidth],
            ),
            height: interpolate(animationState.value, [0, 1], [120, 240]),
            borderTopLeftRadius: 16,
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
            borderBottomRightRadius: 0,
        };
    }, [animationState.value]);

    const eventInfoExpandedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animationState.value, [0, 0.25, 1], [0, 0, 1]),
            marginHorizontal: Constants.SPACING_UNIT_8,
        };
    }, [animationState.value]);

    const { name, imageUrl, description, startTime, endTime } = event;

    return (
        <View>
            <View style={styles.topRowContainer}>
                <Text>TOP ROW</Text>
            </View>

            <Animated.View
                style={[
                    eventTileStyle,
                    styles.eventContainer,
                    styles.dropShadow,
                ]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        isCollapsed ? animateFocus() : animateBlur();
                    }}>
                    <View style={styles.row}>
                        <AnimatedFastImage
                            style={eventImageStyle}
                            source={{ uri: imageUrl }}
                        />
                        {!isCollapsed ||
                        animationStatus === 'expanding' ? null : (
                            <Animated.View
                                entering={FadeInRight.duration(300)}
                                exiting={FadeOutRight.duration(200)}>
                                <View style={styles.spacer16} />
                                <Text style={styles.time}>
                                    {endTime
                                        ? getEventDatetimeRangeString(
                                              startTime,
                                              endTime,
                                          )
                                        : getEventDatetimeStringLong(startTime)}
                                </Text>
                                <View style={styles.spacer8} />
                                <Text style={styles.eventName}>{name}</Text>
                            </Animated.View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                {isCollapsed || animationStatus === 'collapsing' ? null : (
                    <Animated.View
                        style={eventInfoExpandedStyle}
                        entering={FadeInUp}
                        exiting={FadeOutUp}>
                        <View style={styles.spacer8} />
                        <Text style={styles.time}>
                            {endTime
                                ? getEventDatetimeRangeString(
                                      startTime,
                                      endTime,
                                  )
                                : getEventDatetimeStringLong(startTime)}
                        </Text>
                        <Text style={styles.eventName}>{name}</Text>
                        <View style={styles.spacer8} />
                        <Text>{description}</Text>
                        <View style={styles.spacer8} />

                        <View style={styles.row}>
                            <View style={{ flex: 1 }} />
                            <View style={styles.infoButton}>
                                <Text>More Info</Text>
                            </View>
                            <View style={styles.horizontalSpacer16} />

                            <View style={styles.shareButton}>
                                <Text>Share</Text>
                            </View>
                            <View style={{ flex: 1 }} />
                        </View>
                        <View style={styles.spacer8} />
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    eventContainer: {
        borderWidth: 2,
        borderRadius: Constants.SPACING_UNIT_16,
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

    topRowContainer: {
        height: Constants.SPACING_UNIT_24,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dropShadow: {
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    infoButton: {
        width: '55%',
        height: 32,
        borderWidth: 2,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        width: '40%',
        height: 32,
        borderWidth: 2,
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    spacer16: {
        height: Constants.SPACING_UNIT_16,
    },
    spacer8: {
        height: Constants.SPACING_UNIT_8,
    },
    horizontalSpacer16: {
        width: Constants.SPACING_UNIT_16,
    },
});
