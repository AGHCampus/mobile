import React from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { getCurrentLocation } from '../../utils/geolocation';
import { BASE_MAP_STYLE_LIGHT, Constants } from '../../lib/Constants';
import Icon from '../Icon';
import { StyleSheet } from 'react-native';
import { Colors } from '../../lib/Colors';

interface Props {
    setCoordinates: (coordinates: LatLng) => void;
}

export default function LocationSelector({ setCoordinates }: Props) {
    const handleMapReady = async () => {
        const location = await getCurrentLocation();
        setCoordinates(location.coords);
    };
    return (
        <MapView
            onMapReady={async () => await handleMapReady()}
            customMapStyle={BASE_MAP_STYLE_LIGHT}
            region={{
                latitude: 50.065638899794024,
                longitude: 19.91969686063426,
                ...Constants.DEFAULT_REGION_DELTA,
            }}
            provider="google"
            toolbarEnabled={false}
            showsIndoorLevelPicker={false}
            zoomTapEnabled={false}
            showsMyLocationButton={false}
            showsUserLocation
            onRegionChangeComplete={region => {
                setCoordinates({
                    latitude: region.latitude,
                    longitude: region.longitude,
                });
            }}
            style={styles.map}>
            <Icon style={styles.marker} asset={'Marker'} color={Colors.black} />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        height: 300,
        borderWidth: 1,
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        borderColor: Colors.gray,
    },
    marker: {
        alignSelf: 'center',
        marginTop: 150 - 36,
        width: 24,
        height: 36,
    },
});
