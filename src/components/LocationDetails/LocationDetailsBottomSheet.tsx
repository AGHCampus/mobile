import React, {
    useState,
    useMemo,
    useContext,
    RefObject,
    useEffect,
    useCallback,
} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    WithSpringConfig,
} from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import BottomSheetFullScreenHeader from './LocationDetailsFullScreenHeader';
import LocationDetailsTabView from './LocationDetailsTabView';
import { Colors } from '../../lib/Colors';
import { AppDimensionsContext } from '../../../App';
import SharedLocationInfo from './SharedLocationInfo';
import { LatLng } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../lib/Navigation';

const COLLAPSE_ANIMATION_DELAY = Platform.OS === 'ios' ? 100 : 0;

interface Props {
    bottomSheetModalRef: RefObject<BottomSheetModal>;
    selectedLocationID: string;
    locationCoordinates: LatLng | null;
    clearSelectedMarker: () => void;
}

const springConfig: WithSpringConfig = {
    damping: 200,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 150,
};

const LocationDetailsBottomSheet = ({
    bottomSheetModalRef,
    selectedLocationID,
    locationCoordinates,
    clearSelectedMarker,
}: Props) => {
    useEffect(() => {
        if (!selectedLocationID) {
            bottomSheetModalRef.current?.forceClose();
        }
    }, [bottomSheetModalRef, selectedLocationID]);
    const navigation = useNavigation<StackNavigation>();
    const [selectedTabViewIndex, setSelectedTabViewIndex] = useState(0);
    const [bottomSheetCurrentIndex, setBottomSheetCurrentIndex] = useState(1);

    const dimensions = useContext(AppDimensionsContext);
    const insets = useSafeAreaInsets();
    const bottomSheetTopOffset = insets.top + 30;
    const bottomSheetMaxHeight = dimensions.height - bottomSheetTopOffset;

    const animatedPosition = useSharedValue(dimensions.height);
    const snapPoints = useMemo(
        () => [185, 350, bottomSheetMaxHeight],
        [bottomSheetMaxHeight],
    );

    const bottomSheetSnapToIndex = (index: number) => {
        bottomSheetModalRef.current!.snapToIndex(index);
    };

    const handleSheetCollapsePress = () => {
        setTimeout(() => setSelectedTabViewIndex(0), COLLAPSE_ANIMATION_DELAY);
        bottomSheetModalRef.current!.snapToIndex(1);
    };

    const navigateToSettings = useCallback(() => {
        bottomSheetModalRef.current!.dismiss();
        setTimeout(() => {
            navigation.navigate('Settings');
            clearSelectedMarker();
        }, 150);
    }, [bottomSheetModalRef, clearSelectedMarker, navigation]);

    const headerAnimatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedPosition.value,
            [bottomSheetTopOffset + 60, bottomSheetTopOffset + 10],
            [0, 1],
        );
        const y = Math.min(-animatedPosition.value + bottomSheetTopOffset, 0);

        return {
            opacity,
            transform: [{ translateY: y }],
        };
    });
    return (
        <>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                onChange={setBottomSheetCurrentIndex}
                snapPoints={snapPoints}
                animatedPosition={animatedPosition}
                enablePanDownToClose={false}
                enableContentPanningGesture={false}
                handleStyle={styles.handle}
                handleIndicatorStyle={styles.handleIndicator}
                animationConfigs={springConfig}>
                {selectedLocationID === 'SHARED' && locationCoordinates && (
                    <SharedLocationInfo coordinates={locationCoordinates} />
                )}
                {selectedLocationID !== 'SHARED' && (
                    <LocationDetailsTabView
                        selectedLocationID={selectedLocationID}
                        bottomSheetSnapToIndex={bottomSheetSnapToIndex}
                        bottomSheetCurrentIndex={bottomSheetCurrentIndex}
                        selectedTabViewIndex={selectedTabViewIndex}
                        setSelectedTabViewIndex={setSelectedTabViewIndex}
                    />
                )}
            </BottomSheetModal>
            <Portal>
                <Animated.View
                    style={[
                        styles.bottomSheetFullScreenHeader,
                        headerAnimatedStyles,
                    ]}>
                    <BottomSheetFullScreenHeader
                        onCollapseButtonPress={handleSheetCollapsePress}
                        onSearchButtonPress={() => console.log('search')}
                        onMenuButtonPress={navigateToSettings}
                    />
                </Animated.View>
            </Portal>
        </>
    );
};

export default LocationDetailsBottomSheet;

const styles = StyleSheet.create({
    bottomSheetFullScreenHeader: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgWhite,
    },
    handle: {
        paddingTop: 12,
        paddingBottom: 8,
    },
    handleIndicator: {
        width: 60,
        height: 3,
        backgroundColor: Colors.bottomSheetHandle,
    },
});
