import React, {
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
} from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { icons } from '../Icons';
import { Image, StyleSheet, View } from 'react-native';
import { Constants } from '../lib/Constants';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

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
    bottomSheetModalRef: RefObject<BottomSheetModal>;
    isSelected: boolean;
    selectMarker: Dispatch<SetStateAction<string>>;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

function MapMarker({
    data,
    mapViewRef,
    bottomSheetModalRef,
    isSelected,
    selectMarker,
}: Props) {
    const { coordinate, id, type } = data;
    const markerSize = useSharedValue(24);

    const focusMarker = useCallback(() => {
        markerSize.value = withSpring(36, {
            mass: 0.2,
            stiffness: 200,
            damping: 5,
        });
    }, [markerSize]);

    const blurMarker = useCallback(() => {
        markerSize.value = withSpring(24, {
            mass: 0.2,
            stiffness: 200,
            damping: 5,
        });
    }, [markerSize]);

    useEffect(() => {
        isSelected ? focusMarker() : blurMarker();
    }, [blurMarker, focusMarker, isSelected]);

    const markerImageStyle = useAnimatedStyle(() => {
        return {
            width: markerSize.value,
            height: markerSize.value,
            margin: (38 - markerSize.value) / 2,
        };
    }, [markerSize.value]);

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
                if (bottomSheetModalRef.current != null) {
                    bottomSheetModalRef.current.present();
                }
            }}
            style={styles.markerTapTarget}>
            <View style={styles.flexOne}>
                <AnimatedImage
                    source={getMarkerImage(type)}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={markerImageStyle}
                />
            </View>
        </Marker>
    );
}

const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    markerTapTarget: {
        width: 38,
        height: 38,
    },
});

export default React.memo(MapMarker);
