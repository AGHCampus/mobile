import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';

interface Props {
    selectedLocationID: string;
}

const LocationDetailsEventsTab = ({ selectedLocationID }: Props) => {
    return (
        <View style={styles.container}>
            <Text>Events Tab (selectedLocationID={selectedLocationID})</Text>
        </View>
    );
};

export default LocationDetailsEventsTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLightGray,
        padding: Constants.SPACING_UNIT_16,
        gap: Constants.SPACING_UNIT_16,
    },
});
