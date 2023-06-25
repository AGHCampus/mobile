import React, { useState } from 'react';
import {
    Dimensions,
    Share,
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
} from '../utils/time';
import { HorizontalSpacer, VerticalSpacer } from './Spacers';
import AccentButton, { ButtonVariant } from './AccentButton';
import { Shadows } from '../lib/Shadows';
import { openURL } from '../utils/linking';
import { LatLng } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { TabNavigation } from '../screens/navigationTypes';

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

// @ts-ignore TS reports an error, but it works fine 🤷‍♂️
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export default function EventTile({ event }: Props) {
    const navigation = useNavigation<TabNavigation>();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [animationStatus, setAnimationStatus] = useState('idle');
    const [expandHeight, setExpandHeight] = useState(0);
    const animationState = useSharedValue(0);
    const tileWidth =
        Dimensions.get('window').width - 2 * Constants.SPACING_UNIT_24;

    const animateFocus = () => {
        setAnimationStatus('expanding');
        setIsCollapsed(false);
        animationState.value = withTiming(1, { duration: 500 }, () => {
            runOnJS(setAnimationStatus)('idle');
        });
    };

    const animateBlur = () => {
        setAnimationStatus('collapsing');
        animationState.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(setIsCollapsed)(true);
            runOnJS(setAnimationStatus)('idle');
        });
    };

    const eventTileStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                animationState.value,
                [0, 1],
                [120, 240 + expandHeight],
            ),
            flex: 1,
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
            <View style={styles.topRowContainer}>
                {locationLogoUrl && (
                    <FastImage
                        source={{ uri: locationLogoUrl }}
                        style={styles.locationLogo}
                    />
                )}
                <Text>{locationName}</Text>
                {locationCoordinate && (
                    <>
                        <Text> - </Text>
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate('Map', {
                                    eventLocation: locationCoordinate,
                                })
                            }>
                            <Text style={{ color: Colors.accentGreen }}>
                                show on map
                            </Text>
                        </TouchableWithoutFeedback>
                    </>
                )}
            </View>

            <Animated.View
                style={[eventTileStyle, styles.eventContainer, Shadows.depth2]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (animationStatus === 'idle') {
                            isCollapsed ? animateFocus() : animateBlur();
                        }
                    }}>
                    <View style={styles.row}>
                        <AnimatedFastImage
                            style={eventImageStyle}
                            source={{ uri: imageUrl }}
                        />
                        {!isCollapsed ||
                        animationStatus === 'expanding' ? null : (
                            <Animated.View
                                entering={FadeInRight.duration(200)}
                                exiting={FadeOutRight.duration(200)}>
                                <VerticalSpacer height={16} />
                                <Text style={styles.time}>
                                    {endTime
                                        ? getEventDatetimeRangeString(
                                              startTime,
                                              endTime,
                                          )
                                        : getEventDatetimeStringLong(startTime)}
                                </Text>
                                <VerticalSpacer height={8} />
                                <Text style={styles.eventName}>{name}</Text>
                            </Animated.View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                {isCollapsed || animationStatus === 'collapsing' ? null : (
                    <Animated.View
                        onLayout={e => {
                            const { height } = e.nativeEvent.layout;
                            if (height > expandHeight) {
                                setExpandHeight(height);
                            }
                        }}
                        style={eventInfoExpandedStyle}
                        exiting={FadeOutUp.duration(200)}>
                        <VerticalSpacer height={8} />
                        <Text style={styles.time}>
                            {endTime
                                ? getEventDatetimeRangeString(
                                      startTime,
                                      endTime,
                                  )
                                : getEventDatetimeStringLong(startTime)}
                        </Text>
                        <Text style={styles.eventName}>{name}</Text>
                        <VerticalSpacer height={8} />
                        <Text>{description}</Text>
                        <VerticalSpacer height={16} />
                        <View style={styles.row}>
                            {websiteUrl && (
                                <>
                                    <AccentButton
                                        onPress={() =>
                                            openURL('https://google.com')
                                        }
                                        variant={ButtonVariant.PRIMARY}
                                        icon={'Info'}
                                        color={Colors.accentGreen}
                                        label={'More info'}
                                        style={styles.infoButton}
                                    />
                                    <HorizontalSpacer width={16} />
                                </>
                            )}
                            <AccentButton
                                onPress={() => Share.share({ message: 'test' })}
                                variant={ButtonVariant.SECONDARY}
                                icon={'Share'}
                                color={Colors.accentGreen}
                                label={'Share'}
                                style={
                                    websiteUrl
                                        ? styles.shareButton
                                        : styles.singleButton
                                }
                            />
                        </View>
                        <VerticalSpacer height={16} />
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
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoButton: {
        width: '55%',
        height: 32,
    },
    shareButton: {
        width: '40%',
        height: 32,
    },
    singleButton: {
        height: 32,
        marginHorizontal: 24,
        flex: 1,
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
    flexOne: {
        flex: 1,
    },
    locationLogo: {
        width: 20,
        height: 20,
        borderRadius: 12,
        marginHorizontal: 4,
    },
});
