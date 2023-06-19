import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';

interface Props {
    selectedLocationID: string;
}

const LocationDetailsOffersTab = ({ selectedLocationID }: Props) => {
    return (
        <View style={styles.container}>
            <Text>{selectedLocationID} - Offers</Text>
        </View>
    );
};

export default LocationDetailsOffersTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLightGray,
        padding: Constants.SPACING_UNIT_16,
        gap: Constants.SPACING_UNIT_16,
    },
});
