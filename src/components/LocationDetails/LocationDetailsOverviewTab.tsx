import React from 'react';
import { StyleSheet, View, Text, Share } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import AccentButton from '../AccentButton';
import i18n from '../../utils/i18n';
import { openURL } from '../../utils/linking';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';

const SWIPE_UP_VELOCITY_THRESHOLD = -500;
const SWIPE_UP_TRANSLATION_THRESHOLD = -100;
interface Props {
    selectedLocationID: string;
    expandBottomSheet: () => void;
}

const LocationDetailsOverviewTab = ({
    selectedLocationID,
    expandBottomSheet,
}: Props) => {
    const handleSwipeUp = useSharedValue(true);

    const panGesture = Gesture.Pan()
        .onUpdate(e => {
            if (
                e.velocityY < SWIPE_UP_VELOCITY_THRESHOLD &&
                e.translationY < SWIPE_UP_TRANSLATION_THRESHOLD &&
                handleSwipeUp.value
            ) {
                runOnJS(expandBottomSheet)();
                handleSwipeUp.value = false;
            }
        })
        .onEnd(() => {
            handleSwipeUp.value = true;
        });

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.container}>
                <Text>
                    Overview Tab (selectedLocationID={selectedLocationID})
                </Text>
                <View style={styles.buttonsContainer}>
                    <AccentButton.Primary
                        icon={'Website'}
                        color={Colors.accentGreen}
                        label={i18n.t('location.website')}
                        onPress={() => openURL('http://google.com')}
                    />
                    <AccentButton.Secondary
                        icon={'Phone'}
                        color={Colors.accentGreen}
                        label={i18n.t('location.call')}
                        onPress={() => {}}
                    />
                    <AccentButton.Secondary
                        icon={'Share'}
                        color={Colors.accentGreen}
                        label={i18n.t('location.share')}
                        onPress={() => Share.share({ message: 'test' })}
                    />
                </View>
            </View>
        </GestureDetector>
    );
};

export default LocationDetailsOverviewTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLightGray,
        padding: Constants.SPACING_UNIT_16,
        gap: Constants.SPACING_UNIT_16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Constants.SPACING_UNIT_10,
        flexWrap: 'wrap',
    },
});
