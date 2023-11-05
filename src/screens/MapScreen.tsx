import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import type { Region } from 'react-native-maps';
import RNMapView from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
    areRegionsMatching,
    getCurrentLocation,
    handleGeolocationError,
} from '../utils/geolocation';
import Icon from '../components/Icon';
import LocationDetails from '../components/LocationDetails/LocationDetailsBottomSheet';
import MapMarker from '../components/Markers';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BASE_MAP_STYLE_LIGHT, Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { LocationsDataContext } from '../../App';
import SearchBar from '../components/SearchBar';
import { StackNavigation, TabsParamList } from '../lib/Navigation';
import { useNavigation } from '@react-navigation/native';
import MapFilterButtonsRow from '../components/MapFilterButtonsRow';
import { VerticalSpacer } from '../components/Spacers';
import { LocationData } from '../api/locations';

type Props = BottomTabScreenProps<TabsParamList, 'Map'>;

export default function MapScreen({ route }: Props) {
    const navigation = useNavigation<StackNavigation>();
    const locationsData = useContext(LocationsDataContext);

    const mapViewRef = useRef<RNMapView>(null);
    const inputRef = useRef<TextInput>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
        ...Constants.DEFAULT_REGION_DELTA,
    });

    const [selectedMarkerID, setSelectedMarkerID] = useState<string>('');
    const [settingsButtonEnabled, setSettingsButtonEnabled] = useState(true);
    const [followUserLocation, setFollowUserLocation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const { eventLocation } = route.params ?? { eventLocation: null };

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        if (eventLocation) {
            mapViewRef.current?.animateToRegion(
                {
                    ...eventLocation,
                    ...Constants.DEFAULT_REGION_DELTA,
                },
                500,
            );
        }
    }, [navigation, eventLocation]);

    const onRegionChangeComplete = (newRegion: Region) => {
        setCurrentRegion(newRegion);
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

    const handleMapPress = () => {
        inputRef.current?.blur();
        bottomSheetModalRef.current?.dismiss();
        setSelectedMarkerID('');
    };

    const handleSettingsPress = () => {
        // Prevent multiple taps and delay navigation to allow bottom sheet dismiss
        if (!settingsButtonEnabled) {
            return;
        }
        inputRef.current?.blur();
        setSelectedMarkerID('');
        bottomSheetModalRef.current?.forceClose();
        setSettingsButtonEnabled(false);

        setTimeout(() => {
            navigation.navigate('Settings');
            setSettingsButtonEnabled(true);
        }, 100);
    };

    const shouldDisplayMarker = (marker: LocationData) => {
        return (
            selectedCategories.length === 0 ||
            (selectedCategories.length > 0 &&
                selectedCategories.includes(marker.category))
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                followsUserLocation={followUserLocation}
                onMapReady={async () => await getInitialRegion()}
                onRegionChangeComplete={onRegionChangeComplete}
                onRegionChange={onRegionChange}
                customMapStyle={BASE_MAP_STYLE_LIGHT}
                provider="google"
                toolbarEnabled={false}
                showsIndoorLevelPicker={false}
                ref={mapViewRef}
                zoomTapEnabled={false}
                region={region}
                showsMyLocationButton={false}
                showsUserLocation
                onPress={handleMapPress}
                minPoints={3}
                style={styles.map}>
                {Object.values(locationsData)
                    .filter(shouldDisplayMarker)
                    .map(location => (
                        <MapMarker
                            data={location}
                            coordinate={location.coordinate}
                            mapViewRef={mapViewRef}
                            bottomSheetModalRef={bottomSheetModalRef}
                            key={`marker_${location.id}`}
                            isSelected={selectedMarkerID === location.id}
                            selectMarker={setSelectedMarkerID}
                        />
                    ))}
            </MapView>
            <View style={styles.topContentOverlay}>
                <SearchBar inputRef={inputRef} onPress={handleSettingsPress} />
                <VerticalSpacer height={Constants.SPACING_UNIT_8} />
                <MapFilterButtonsRow
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            </View>

            <LocationDetails
                bottomSheetModalRef={bottomSheetModalRef}
                selectedLocationID={selectedMarkerID}
            />
            <View style={styles.opacityOverlay}>
                <TouchableOpacity
                    activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY}
                    onPress={animateToUserRegion}>
                    <View style={[styles.locationButton, Shadows.depth2]}>
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
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        borderColor: Colors.accentGreen,
        backgroundColor: Colors.bgWhite,
    },
    locationIcon: { width: 28, height: 28 },
    topContentOverlay: {
        position: 'absolute',
        top: 48,
    },
});
