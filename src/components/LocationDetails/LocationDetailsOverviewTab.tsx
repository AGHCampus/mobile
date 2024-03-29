import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Share,
    ScrollView,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Linking,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import AccentButton from '../AccentButton';
import InfoCard from '../InfoCard';
import { HorizontalSpacer, VerticalSpacer } from '../Spacers';
import i18n from '../../utils/i18n';
import { openURL } from '../../utils/linking';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { LocationData, LocationDetailsData } from '../../api/locations';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';
import { getMarkerImageByCategory } from '../Markers';
import { getLocationShareText } from '../../utils/sharing';

function PhotosSpacerHeader() {
    return <HorizontalSpacer width={Constants.SPACING_UNIT_10} />;
}

function PhotosSpacer() {
    return <HorizontalSpacer width={6} />;
}

function PhotosSpacerFooter() {
    return <HorizontalSpacer width={Constants.SPACING_UNIT_10} />;
}

interface Props {
    locationData?: LocationData;
    locationDetailsData?: LocationDetailsData;
    locationDetailsDataStatus: DataFetchingStatus;
    bottomSheetSnapToIndex: (index: number) => void;
    bottomSheetCurrentIndex: number;
}

const LocationDetailsOverviewTab = ({
    locationData,
    locationDetailsData,
    locationDetailsDataStatus,
    bottomSheetSnapToIndex,
    bottomSheetCurrentIndex,
}: Props) => {
    const isOnTop = useSharedValue(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollHeight =
            event.nativeEvent.contentSize.height -
            event.nativeEvent.layoutMeasurement.height;
        const y = event.nativeEvent.contentOffset.y;
        if (bottomSheetCurrentIndex === 2 && isOnTop.value && y < 0) {
            bottomSheetSnapToIndex(1);
        }
        if (bottomSheetCurrentIndex === 1 && y > scrollHeight - 1) {
            bottomSheetSnapToIndex(2);
        }
        isOnTop.value = false;
    };

    const handleScrollBeginDrag = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y === 0) {
            isOnTop.value = true;
        }
    };

    const handleScrollEndDrag = () => {
        if (
            Platform.OS === 'android' &&
            bottomSheetCurrentIndex === 2 &&
            isOnTop.value
        ) {
            bottomSheetSnapToIndex(1);
        }
        isOnTop.value = false;
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBeginDrag}
                onScrollEndDrag={handleScrollEndDrag}
                scrollEventThrottle={16}>
                <View style={styles.scrollViewContent}>
                    <DataFetchStatusWrapper
                        status={locationDetailsDataStatus}
                        errorMessage="Failed to fetch data for this location">
                        {locationData && locationDetailsData && (
                            <>
                                <View style={styles.row}>
                                    {locationData.logoUrl ? (
                                        <FastImage
                                            source={{
                                                uri: locationData.logoUrl,
                                            }}
                                            style={styles.locationLogo}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.locationCategoryLogo}
                                            source={getMarkerImageByCategory(
                                                locationData.category,
                                            )}
                                        />
                                    )}
                                    <View>
                                        <Text style={styles.locationCategory}>
                                            {i18n.t(
                                                `categories.${locationData.category}`,
                                            )}
                                        </Text>
                                        <Text style={styles.locationName}>
                                            {locationData.name}
                                        </Text>
                                    </View>
                                </View>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.horizontalScrollable}>
                                    <HorizontalSpacer
                                        width={Constants.SPACING_UNIT_10}
                                    />
                                    <AccentButton.Primary
                                        icon={'Website'}
                                        color={Colors.accentGreen}
                                        label={i18n.t('location.website')}
                                        onPress={() =>
                                            openURL(
                                                locationDetailsData.websiteUrl,
                                            )
                                        }
                                    />
                                    <HorizontalSpacer
                                        width={Constants.SPACING_UNIT_8}
                                    />
                                    <AccentButton.Secondary
                                        icon={'Phone'}
                                        color={Colors.accentGreen}
                                        label={i18n.t('location.call')}
                                        onPress={() => {
                                            Linking.openURL(
                                                `tel:${locationDetailsData.phoneNumber}`,
                                            );
                                        }}
                                    />
                                    <HorizontalSpacer
                                        width={Constants.SPACING_UNIT_8}
                                    />
                                    <AccentButton.Secondary
                                        icon={'Share'}
                                        color={Colors.accentGreen}
                                        label={i18n.t('location.share')}
                                        onPress={() =>
                                            Share.share({
                                                message:
                                                    getLocationShareText(
                                                        locationData,
                                                    ),
                                            })
                                        }
                                    />
                                    <HorizontalSpacer
                                        width={Constants.SPACING_UNIT_10}
                                    />
                                </ScrollView>
                                {locationDetailsData.photos.length > 0 && (
                                    <View style={styles.sectionContainer}>
                                        <Text style={styles.sectionTitle}>
                                            {i18n.t('location.photos')}
                                        </Text>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            scrollEnabled
                                            data={locationDetailsData.photos}
                                            renderItem={imageUrl => (
                                                <FastImage
                                                    key={imageUrl.index}
                                                    source={{
                                                        uri: imageUrl.item,
                                                    }}
                                                    style={styles.image}
                                                />
                                            )}
                                            ListHeaderComponent={
                                                PhotosSpacerHeader
                                            }
                                            ItemSeparatorComponent={
                                                PhotosSpacer
                                            }
                                            ListFooterComponent={
                                                PhotosSpacerFooter
                                            }
                                            style={styles.horizontalScrollable}
                                        />
                                    </View>
                                )}
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>
                                        {i18n.t('location.info')}
                                    </Text>
                                    <View style={styles.infoContainer}>
                                        <InfoCard
                                            data={[
                                                [
                                                    i18n.t(
                                                        'location.description',
                                                    ),
                                                    locationDetailsData.description,
                                                ],
                                            ]}
                                        />
                                        <InfoCard
                                            data={[
                                                [
                                                    i18n.t(
                                                        'location.opening_hours',
                                                    ),
                                                    locationDetailsData.openingHours,
                                                ],
                                                [
                                                    i18n.t(
                                                        'location.phone_number',
                                                    ),
                                                    locationDetailsData.phoneNumber,
                                                ],
                                                [
                                                    i18n.t('location.website'),
                                                    locationDetailsData.websiteUrl,
                                                ],
                                                [
                                                    i18n.t('location.address'),
                                                    locationData.address,
                                                ],
                                            ]}
                                        />
                                    </View>
                                </View>
                                <VerticalSpacer
                                    height={Constants.SPACING_UNIT_24}
                                />
                            </>
                        )}
                    </DataFetchStatusWrapper>
                </View>
            </ScrollView>
        </View>
    );
};

export default LocationDetailsOverviewTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLightGray,
    },

    scrollViewContent: {
        flexDirection: 'column',
        paddingVertical: Constants.SPACING_UNIT_16,
        paddingHorizontal: Constants.SPACING_UNIT_10,
        gap: Constants.SPACING_UNIT_10,
    },

    locationLogo: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

    locationCategoryLogo: {
        width: 32,
        height: 32,
    },

    locationCategory: {
        fontWeight: '300',
        fontSize: 13,
        lineHeight: 16,
        color: Colors.textGray,
    },

    locationName: {
        fontWeight: '400',
        fontSize: 21,
        lineHeight: 24,
        color: Colors.black,
        paddingTop: 2,
        paddingBottom: 2,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Constants.SPACING_UNIT_10,
    },

    horizontalScrollable: {
        marginHorizontal: -Constants.SPACING_UNIT_10,
    },

    sectionContainer: {
        marginTop: 6,
        marginBottom: Constants.SPACING_UNIT_8,
    },

    sectionTitle: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 22,
        color: Colors.black,
        paddingBottom: Constants.SPACING_UNIT_8,
    },

    imageScrollView: {
        gap: Constants.SPACING_UNIT_8,
    },

    image: {
        height: 150,
        aspectRatio: 3 / 2,
        borderRadius: Constants.BORDER_RADIUS_SMALL,
    },

    infoContainer: {
        gap: Constants.SPACING_UNIT_16,
    },
});
