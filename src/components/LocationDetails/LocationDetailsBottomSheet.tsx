import React, {
    useState,
    useCallback,
    useMemo,
    useContext,
    RefObject,
} from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    WithSpringConfig,
} from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { AppDimensionsContext } from '../../../App';
import BottomSheetFullScreenHeader from './LocationDetailsFullScreenHeader';
import LocationDetailsTabView from './LocationDetailsTabView';
import { Colors } from '../../lib/Colors';

interface Props {
    bottomSheetModalRef: RefObject<BottomSheetModal>;
    selectedLocationID: string;
}

const springConfig: WithSpringConfig = {
    damping: 200,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
};

const LocationDetails = ({
    bottomSheetModalRef,
    selectedLocationID,
}: Props) => {
    const [bottomSheetFullScreen, setBottomSheetFullScreen] = useState(false);

    const dimensions = useContext(AppDimensionsContext);
    const insets = useSafeAreaInsets();
    const bottomSheetTopOffset = insets.top + 30;
    const bottomSheetMaxHeight = dimensions.height - bottomSheetTopOffset;

    const animatedPosition = useSharedValue(dimensions.height);
    const snapPoints = useMemo(
        () => [170, 350, bottomSheetMaxHeight],
        [bottomSheetMaxHeight],
    );

    const handleSheetCollapsePress = () => {
        bottomSheetModalRef.current!.snapToIndex(1);
    };

    const handleSheetChanges = useCallback((index: number) => {
        setBottomSheetFullScreen(index === 2);
    }, []);

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
                snapPoints={snapPoints}
                animatedPosition={animatedPosition}
                onChange={handleSheetChanges}
                enablePanDownToClose={false}
                enableContentPanningGesture={false}
                handleStyle={styles.handle}
                handleIndicatorStyle={styles.handleIndicator}
                animationConfigs={springConfig}>
                <LocationDetailsTabView
                    isBottomSheetFullscreen={bottomSheetFullScreen}
                    selectedLocationID={selectedLocationID}
                />
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
                        onMenuButtonPress={() => console.log('menu')}
                    />
                </Animated.View>
            </Portal>
        </>
    );
};

export default LocationDetails;

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
