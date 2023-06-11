import React, {
    useRef,
    useState,
    useCallback,
    useMemo,
    useContext,
    useEffect,
    RefObject,
} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    WithSpringConfig,
} from 'react-native-reanimated';
import { Colors } from '../lib/Colors';
import BottomSheetFullScreenHeader from './BottomSheetFullScreenHeader';
import AccentButton from './AccentButton';

import { AppDimensionsContext } from '../../App';
import { Constants } from '../lib/Constants';
import TabViewExample from './LocationDetailsTabView';

interface Props {
    bottomSheetModalRef: RefObject<BottomSheetModal>;
    selectedLocation: string;
}

const springConfig: WithSpringConfig = {
    damping: 200,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
};

const LocationDetails = ({ bottomSheetModalRef, selectedLocation }: Props) => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [bottomSheetFullScreen, setBottomSheetFullScreen] = useState(false);

    const dimensions = useContext(AppDimensionsContext);
    const insets = useSafeAreaInsets();
    const bottomSheetTopOffset = insets.top + 30;
    const bottomSheetMaxHeight = dimensions.height - bottomSheetTopOffset;

    console.log('\n\n');
    console.log('dimensions', dimensions);
    console.log('insets', insets);
    console.log('bottomSheetTopOffset', bottomSheetTopOffset);
    console.log('bottomSheetMaxHeight', bottomSheetMaxHeight);
    console.log('showBottomSheet', showBottomSheet);
    console.log('bottomSheetFullScreen', bottomSheetFullScreen);

    const animatedPosition = useSharedValue(dimensions.height);
    const snapPoints = useMemo(
        () => [150, 350, bottomSheetMaxHeight],
        [bottomSheetMaxHeight],
    );

    const handleSheetCollapsePress = useCallback(() => {
        bottomSheetModalRef.current!.snapToIndex(1);
    }, [bottomSheetModalRef]);

    const handleSheetChanges = useCallback((index: number) => {
        setShowBottomSheet(index !== -1);
        setBottomSheetFullScreen(index === 2);
        console.log('handleSheetChanges', index);
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
                enableHandlePanningGesture={!bottomSheetFullScreen}
                enableContentPanningGesture={!bottomSheetFullScreen}
                animationConfigs={springConfig}>
                <View style={styles.contentContainer}>
                    <TabViewExample />
                    {/* <Text>{selectedLocation}</Text> */}
                    {/* <View style={styles.buttonsContainer}>
                        <AccentButton
                            variant="primary"
                            icon="Website"
                            color={Colors.accentGreen}>
                            Website
                        </AccentButton>
                        <AccentButton
                            variant="secondary"
                            icon="Phone"
                            color={Colors.accentGreen}>
                            Call
                        </AccentButton>
                        <AccentButton
                            variant="secondary"
                            icon="Share"
                            color={Colors.accentGreen}>
                            Share
                        </AccentButton>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('close');
                                setShowBottomSheet(!showBottomSheet);
                            }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View> */}
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
            </Portal>
        </>
    );
};

export default LocationDetails;

const styles = StyleSheet.create({
    contentContainer: {
        // padding: Constants.SPACING_UNIT_16,
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Constants.SPACING_UNIT_10,
    },
    bottomSheetFullScreenHeader: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bgWhite,
    },
});
