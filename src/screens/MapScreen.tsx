import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Button,
    useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import type { Region } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import {
    areRegionsMatching,
    getCurrentLocation,
    handleGeolocationError,
} from '../geolocation';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import BottomSheetFullScreenHeader from '../components/BottomSheetFullScreenHeader';
import Icon from '../components/Icon';

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

    // BottomSheet
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const bottomSheetTopOffset = insets.top + 30;
    const bottomSheetMaxHeight = height - bottomSheetTopOffset;

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const animatedPosition = useSharedValue(height);
    const snapPoints = useMemo(
        () => [135, 350, bottomSheetMaxHeight],
        [bottomSheetMaxHeight],
    );

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [bottomSheetFullScreen, setBottomSheetFullScreen] = useState(false);

    const handleSheetCollapsePress = useCallback(() => {
        bottomSheetModalRef.current!.snapToIndex(1);
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        setShowBottomSheet(index !== -1);
        setBottomSheetFullScreen(index === 2);
        // console.log('handleSheetChanges', index);
    }, []);

    const headerAnimatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedPosition.value,
            [bottomSheetTopOffset + 120, bottomSheetTopOffset + 20],
            [0, 1],
        );
        const y = Math.min(-animatedPosition.value + bottomSheetTopOffset, 0);

        return {
            opacity,
            transform: [{ translateY: y }],
        };
    });

    // just for demo purpose these methods will be used in the map component
    const handleSheetPresentPress = () => {
        if (showBottomSheet) {
            bottomSheetModalRef.current!.dismiss();
        } else {
            bottomSheetModalRef.current!.present();
        }
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

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                animatedPosition={animatedPosition}
                onChange={handleSheetChanges}
                enablePanDownToClose={false}
                enableHandlePanningGesture={!bottomSheetFullScreen}
                enableContentPanningGesture={!bottomSheetFullScreen}>
                <View>
                    <Text>BottomSheetModal</Text>
                </View>
            </BottomSheetModal>

            <Portal>
                <Animated.View
                    style={[
                        styles.bottomSheetFullScreenHeader,
                        headerAnimatedStyles,
                    ]}>
                    <BottomSheetFullScreenHeader
                        onCollapsePress={handleSheetCollapsePress}
                    />
                </Animated.View>

                {/* Just for testing purposes remove later */}
                <View style={styles.testButtons}>
                    <Button
                        title="open/hide bottom sheet"
                        onPress={handleSheetPresentPress}
                    />
                    <Button
                        title="print state"
                        onPress={() => {
                            console.log('showBottomSheet: ', showBottomSheet);
                            console.log(
                                'bottomSheetFullScreen: ',
                                bottomSheetFullScreen,
                            );
                        }}
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
