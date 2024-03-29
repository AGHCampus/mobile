import React, { PropsWithChildren, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import EventLocation from './EventLocation';
import EventButtonRow from './EventButtonRow';
import { VerticalSpacer } from '../Spacers';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { Shadows } from '../../lib/Shadows';
import { getEventDatetimeString } from '../../utils/time';
import i18n from '../../utils/i18n';
import { getEventShareText, getOfferShareText } from '../../utils/sharing';
import { LocationData } from '../../api/locations';
import { EventData } from '../../api/events';

function ShareOpacityWrapper({
    shareOnLongPress,
    location,
    event,
    children,
}: PropsWithChildren<{
    shareOnLongPress: boolean;
    location: LocationData;
    event: EventData;
}>) {
    if (shareOnLongPress && location && event) {
        return (
            <TouchableOpacity
                onLongPress={() =>
                    Share.share(getOfferShareText(event, location))
                }
                activeOpacity={0.6}>
                {children}
            </TouchableOpacity>
        );
    }

    return <>{children}</>;
}

interface Props {
    location: LocationData;
    event: EventData;
    showLocationLink: boolean;
    showEventButtonRow: boolean;
    shareOnLongPress: boolean;
}

export default function ColumnEventTile({
    location,
    event,
    showLocationLink,
    showEventButtonRow,
    shareOnLongPress,
}: Props) {
    const [expanded, setExpanded] = React.useState(false);
    const expandedHeight = useRef(74);
    const textAnimatedHeight = useSharedValue(74);
    const showMoreAnimatedValue = useSharedValue(0);

    const textAnimatedStyles = useAnimatedStyle(() => ({
        height: withTiming(textAnimatedHeight.value, { duration: 250 }),
    }));

    const showMoreAnimatedStyles = useAnimatedStyle(() => ({
        height: withTiming(
            interpolate(showMoreAnimatedValue.value, [0, 1], [20, 0]),
            {
                duration: 250,
            },
        ),
    }));

    const textMaskAnimatedStyles = useAnimatedStyle(() => ({
        backgroundColor: withTiming(
            `rgba(255, 255, 255, ${showMoreAnimatedValue.value})`,
            {
                duration: 250,
            },
        ),
    }));

    const { title, imageUrl, description, websiteUrl, startDate, endDate } =
        event;

    return (
        <View>
            {showLocationLink && location && (
                <EventLocation
                    name={location.name}
                    coordinate={location.coordinate}
                    logoUrl={location.logoUrl}
                />
            )}
            <ShareOpacityWrapper
                shareOnLongPress={shareOnLongPress}
                location={location}
                event={event}>
                <Animated.View style={[styles.eventContainer, Shadows.depth2]}>
                    <FastImage
                        style={styles.image}
                        source={{ uri: imageUrl }}
                    />
                    <View style={styles.eventDetailsContainer}>
                        <Text style={styles.time}>
                            {getEventDatetimeString(startDate, endDate)}
                        </Text>
                        {title && (
                            <Text style={styles.eventTitle}>{title}</Text>
                        )}
                        <VerticalSpacer
                            height={title ? Constants.SPACING_UNIT_8 : 4}
                        />
                        <TouchableOpacity
                            activeOpacity={expanded ? 1 : 0.6}
                            onPress={() => {
                                textAnimatedHeight.value =
                                    expandedHeight.current;
                                showMoreAnimatedValue.value = 1;
                                setExpanded(true);
                            }}>
                            <Animated.View style={textAnimatedStyles}>
                                <MaskedView
                                    maskElement={
                                        <Animated.View
                                            style={[
                                                styles.flexOne,
                                                textMaskAnimatedStyles,
                                            ]}>
                                            <LinearGradient
                                                style={styles.flexOne}
                                                colors={[
                                                    'white',
                                                    'transparent',
                                                ]}
                                            />
                                        </Animated.View>
                                    }>
                                    <Text style={styles.eventDescription}>
                                        {description}
                                    </Text>
                                </MaskedView>
                            </Animated.View>
                            <Animated.View style={showMoreAnimatedStyles}>
                                <Text style={styles.showMore}>
                                    {i18n.t('events.show_more')}
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        <Text
                            style={[styles.eventDescription, styles.invisible]}
                            onLayout={e => {
                                const { height } = e.nativeEvent.layout;
                                expandedHeight.current = height;
                                if (height < 100) {
                                    textAnimatedHeight.value = height;
                                    showMoreAnimatedValue.value = 1;
                                    setExpanded(true);
                                }
                            }}>
                            {description}
                        </Text>
                        {showEventButtonRow && location && event && (
                            <>
                                <VerticalSpacer
                                    height={Constants.SPACING_UNIT_16}
                                />
                                <EventButtonRow
                                    url={websiteUrl}
                                    shareContent={getEventShareText(
                                        event,
                                        location,
                                    )}
                                />
                            </>
                        )}
                    </View>
                </Animated.View>
            </ShareOpacityWrapper>
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

    showMore: {
        textAlign: 'center',
        color: Colors.textLink,
    },

    invisible: {
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
    },

    flexOne: {
        flex: 1,
    },

    eventDetailsContainer: {
        flex: 1,
        margin: Constants.SPACING_UNIT_16,
        marginTop: Constants.SPACING_UNIT_10,
    },

    image: {
        width: '100%',
        aspectRatio: 3 / 2,
        borderTopLeftRadius: Constants.BORDER_RADIUS_MEDIUM,
        borderTopRightRadius: Constants.BORDER_RADIUS_MEDIUM,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
});
