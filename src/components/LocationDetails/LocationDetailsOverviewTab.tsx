import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AccentButton, { ButtonVariant } from '../AccentButton';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';

interface Props {
    selectedLocationID: string;
}

const LocationDetailsOverviewTab = ({ selectedLocationID }: Props) => {
    return (
        <View style={styles.container}>
            <Text>Overview Tab (selectedLocationID={selectedLocationID})</Text>
            <View style={styles.buttonsContainer}>
                <AccentButton
                    variant={ButtonVariant.PRIMARY}
                    icon={'Website'}
                    color={Colors.accentGreen}>
                    Website
                </AccentButton>
                <AccentButton
                    variant={ButtonVariant.SECONDARY}
                    icon={'Phone'}
                    color={Colors.accentGreen}>
                    Call
                </AccentButton>
                <AccentButton
                    variant={ButtonVariant.SECONDARY}
                    icon={'Share'}
                    color={Colors.accentGreen}>
                    Share
                </AccentButton>
            </View>
        </View>
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
    },
});
