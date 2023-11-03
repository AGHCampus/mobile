import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Constants } from '../lib/Constants';
import { icons } from '../Icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {
    coordinate: LatLng;
    mapViewRef: RefObject<MapView>;
    selectMarker: Dispatch<SetStateAction<void>>;
    bottomSheetModalRef: RefObject<BottomSheetModal>;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

function SharedLocationMarker({
    coordinate,
    mapViewRef,
    selectMarker,
    bottomSheetModalRef,
}: Props) {
    const markerSize = useSharedValue(32);

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
            id={'sharedLocationMarker'}
            stopPropagation
            key={'sharedLocationMarker'}
            onPress={() => {
                selectMarker();
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion(
                        {
                            ...coordinate,
                            ...Constants.DEFAULT_ZOOMED_IN_REGION_DELTA,
                        },
                        500,
                    );
                }
                if (bottomSheetModalRef.current) {
                    bottomSheetModalRef.current.present();
                }
            }}
            style={styles.markerTapTarget}>
            <View style={styles.flexOne}>
                <AnimatedImage
                    source={icons.Marker.src}
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

export default React.memo(SharedLocationMarker);
