import React, { Dispatch, RefObject, SetStateAction } from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { icons } from '../Icons';
import { Image, StyleSheet } from 'react-native';
import { Constants } from '../lib/Constants';

export enum MarkerType {
    FACULTY,
    DORM,
    SHOP,
    CLUB,
    RESTAURANT,
}

export interface MarkerData {
    id: string;
    coordinate: LatLng;
    type: MarkerType;
}

export function getMarkerImage(markerType: MarkerType) {
    switch (markerType) {
        case MarkerType.FACULTY:
            return icons.Faculty.src;
        case MarkerType.DORM:
            return icons.Dorm.src;
        case MarkerType.SHOP:
            return icons.Shop.src;
        case MarkerType.CLUB:
            return icons.Club.src;
        case MarkerType.RESTAURANT:
            return icons.Restaurant.src;
        default:
            return icons.Info.src;
    }
}

interface Props {
    data: MarkerData;
    coordinate: LatLng;
    mapViewRef: RefObject<MapView>;
    isSelected: boolean;
    selectMarker: Dispatch<SetStateAction<string>>;
}

function MapMarker({ data, mapViewRef, isSelected, selectMarker }: Props) {
    const { coordinate, id, type } = data;
    return (
        <Marker
            coordinate={coordinate}
            id={id}
            stopPropagation
            key={`marker_${id}`}
            onPress={() => {
                selectMarker(id);
                if (mapViewRef.current != null) {
                    mapViewRef.current.animateToRegion(
                        {
                            ...coordinate,
                            ...Constants.DEFAULT_ZOOMED_IN_REGION_DELTA,
                        },
                        500,
                    );
                }
            }}
            style={
                isSelected ? styles.selectedMarker : styles.markerNotSelected
            }>
            <Image
                source={getMarkerImage(type)}
                resizeMode="contain"
                style={
                    isSelected
                        ? styles.selectedMarker
                        : styles.markerNotSelected
                }
            />
        </Marker>
    );
}

const styles = StyleSheet.create({
    selectedMarker: {
        width: 36,
        height: 36,
    },
    markerNotSelected: {
        width: 24,
        height: 24,
    },
});

export default React.memo(MapMarker);
