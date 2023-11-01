import React, {
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { icons } from '../Icons';
import { Constants } from '../lib/Constants';
import { LocationData } from '../api/locations';

export function getMarkerImageByCategory(category: string) {
    switch (category) {
        case 'faculty':
            return icons.Faculty.src;
        case 'dormitory':
            return icons.Dorm.src;
        case 'shop':
            return icons.Shop.src;
        case 'club':
            return icons.Club.src;
        case 'restaurant':
            return icons.Restaurant.src;
        default:
            return icons.Info.src;
    }
}

interface Props {
    data: LocationData;
    coordinate: LatLng;
    mapViewRef: RefObject<MapView>;
    bottomSheetModalRef: RefObject<BottomSheetModal>;
    isSelected: boolean;
    selectMarker: Dispatch<SetStateAction<string>>;
}

const SPRING_CONFIG = { mass: 0.2, stiffness: 200, damping: 5 };

const AnimatedImage = Animated.createAnimatedComponent(Image);

function MapMarker({
    data,
    mapViewRef,
    bottomSheetModalRef,
    isSelected,
    selectMarker,
}: Props) {
    const { coordinate, id, category } = data;
    const markerSize = useSharedValue(24);

    const focusMarker = useCallback(() => {
        markerSize.value = withSpring(36, SPRING_CONFIG);
    }, [markerSize]);

    const blurMarker = useCallback(() => {
        markerSize.value = withSpring(24, SPRING_CONFIG);
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
                    source={getMarkerImageByCategory(category)}
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
