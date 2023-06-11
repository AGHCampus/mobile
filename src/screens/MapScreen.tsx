import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import MapView from 'react-native-maps';
import type { Region } from 'react-native-maps';
import { Portal } from '@gorhom/portal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
    areRegionsMatching,
    getCurrentLocation,
    handleGeolocationError,
} from '../geolocation';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import Icon from '../components/Icon';
import LocationDetails from '../components/LocationDetailsBottomSheet';

export default function MapScreen() {
    // MapView
    const mapViewRef = useRef<MapView>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
        ...Constants.DEFAULT_REGION_DELTA,
    });

    const [followUserLocation, setFollowUserLocation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

    const onRegionChangeComplete = () => {
        setIsAnimating(false);
    };

    const onRegionChange = (newRegion: Region) => {
        if (currentRegion === null) {
            setFollowUserLocation(false);
        } else if (
            !isAnimating &&
            followUserLocation &&
            !areRegionsMatching(newRegion, currentRegion)
        ) {
            setFollowUserLocation(false);
        }
    };

    const animateToUserRegion = async () => {
        const position = await getCurrentLocation().catch(
            handleGeolocationError,
        );
        setIsAnimating(true);
        if (position) {
            const { latitude, longitude } = position.coords;
            const userRegion = {
                latitude,
                longitude,
                ...Constants.DEFAULT_REGION_DELTA,
            };
            setCurrentRegion(userRegion);
            mapViewRef.current?.animateToRegion(userRegion, 1000);
            setFollowUserLocation(true);
        }
    };

    const getInitialRegion = async () => {
        const position = await getCurrentLocation();

        if (position) {
            const { latitude, longitude } = position.coords;
            setRegion({
                latitude,
                longitude,
                ...Constants.DEFAULT_REGION_DELTA,
            });
            setFollowUserLocation(true);
        }
    };

    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null,
    );

    // BottomSheet
    // const dimensions = useContext(AppDimensionsContext);
    // const insets = useSafeAreaInsets();
    // const bottomSheetTopOffset = insets.top + 30;
    // const bottomSheetMaxHeight = dimensions.height - bottomSheetTopOffset;

    // console.log('\n\n');
    // console.log('dimensions', dimensions);
    // console.log('insets', insets);
    // console.log('bottomSheetTopOffset', bottomSheetTopOffset);
    // console.log('bottomSheetMaxHeight', bottomSheetMaxHeight);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // const animatedPosition = useSharedValue(dimensions.height);
    // const snapPoints = useMemo(
    //     () => [135, 350, bottomSheetMaxHeight],
    //     [bottomSheetMaxHeight],
    // );

    // const [showBottomSheet, setShowBottomSheet] = useState(false);
    // const [bottomSheetFullScreen, setBottomSheetFullScreen] = useState(false);

    // const handleSheetCollapsePress = useCallback(() => {
    //     bottomSheetModalRef.current!.snapToIndex(1);
    // }, []);

    // const handleSheetChanges = useCallback((index: number) => {
    //     setShowBottomSheet(index !== -1);
    //     setBottomSheetFullScreen(index === 2);
    //     console.log('handleSheetChanges', index);
    // }, []);

    // const headerAnimatedStyles = useAnimatedStyle(() => {
    //     const opacity = interpolate(
    //         animatedPosition.value,
    //         [bottomSheetTopOffset + 120, bottomSheetTopOffset + 20],
    //         [0, 1],
    //     );
    //     const y = Math.min(-animatedPosition.value + bottomSheetTopOffset, 0);

    //     return {
    //         opacity,
    //         transform: [{ translateY: y }],
    //     };
    // });

    const handleSelectLocation = () => {
        setSelectedLocation('AGH');
        bottomSheetModalRef.current?.present();
    };

    const handleUnselectLocation = () => {
        setSelectedLocation(null);
        bottomSheetModalRef.current?.dismiss();
    };

    return (
        <View style={styles.container}>
            <MapView
                followsUserLocation={followUserLocation}
                onMapReady={async () => await getInitialRegion()}
                onRegionChangeComplete={onRegionChangeComplete}
                onRegionChange={onRegionChange}
                provider="google"
                ref={mapViewRef}
                region={region}
                showsMyLocationButton={false}
                showsUserLocation
                style={styles.map}
            />

            <LocationDetails
                bottomSheetModalRef={bottomSheetModalRef}
                selectedLocation={selectedLocation}
            />

            <Portal>
                <View style={styles.testButtons}>
                    <Button
                        title="open bottom sheet"
                        onPress={handleSelectLocation}
                    />
                    <Button
                        title="hide bottom sheet"
                        onPress={handleUnselectLocation}
                    />
                </View>
            </Portal>

            <View style={styles.opacityOverlay}>
                <TouchableOpacity onPress={animateToUserRegion}>
                    <View style={styles.locationButton}>
                        <Icon
                            asset={
                                followUserLocation
                                    ? 'Location'
                                    : 'EmptyLocation'
                            }
                            color={
                                followUserLocation
                                    ? Colors.accentGreen
                                    : Colors.black
                            }
                            style={styles.locationIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    opacityOverlay: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    locationButton: {
        width: Constants.TAP_UNIT_48,
        height: Constants.TAP_UNIT_48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.bgWhite,
        shadowColor: Colors.shadowGrey,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    locationIcon: { width: 28, height: 28 },
    bottomSheetFullScreenHeader: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgWhite,
    },

    // Just for testing purposes remove later
    testButtons: {
        position: 'absolute',
        zIndex: 1,
        top: 150,
        left: 80,
    },
});
