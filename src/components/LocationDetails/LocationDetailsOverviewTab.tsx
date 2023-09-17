import React from 'react';
import { StyleSheet, View, Text, Share } from 'react-native';
import AccentButton from '../AccentButton';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { openURL } from '../../utils/linking';

interface Props {
    selectedLocationID: string;
}

const LocationDetailsOverviewTab = ({ selectedLocationID }: Props) => {
    return (
        <View style={styles.container}>
            <Text>Overview Tab (selectedLocationID={selectedLocationID})</Text>
            <View style={styles.buttonsContainer}>
                <AccentButton.Primary
                    icon={'Website'}
                    color={Colors.accentGreen}
                    label={'Website'}
                    onPress={() => openURL('google.com')}
                />
                <AccentButton.Secondary
                    icon={'Phone'}
                    color={Colors.accentGreen}
                    label={'Call'}
                    onPress={() => {}}
                />
                <AccentButton.Secondary
                    icon={'Share'}
                    color={Colors.accentGreen}
                    label={'Share'}
                    onPress={() => Share.share({ message: 'test' })}
                />
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
