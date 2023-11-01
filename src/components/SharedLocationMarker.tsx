import React, { RefObject } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Constants } from '../lib/Constants';
import { icons } from '../Icons';

interface Props {
    coordinate: LatLng;
    mapViewRef: RefObject<MapView>;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

function SharedLocationMarker({ coordinate, mapViewRef }: Props) {
    const markerSize = useSharedValue(24);

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
            key={`sharedLocationMarker`}
            onPress={() => {
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
            style={styles.markerTapTarget}>
            <View style={styles.flexOne}>
                <AnimatedImage
                    source={icons.Info.src}
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
