import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../lib/Colors';
import i18n from '../../utils/i18n';
import { LatLng } from 'react-native-maps';
import { Constants } from '../../lib/Constants';
import InfoCard from '../InfoCard';

interface Props {
    coordinates: LatLng;
}

const SharedLocationInfo = ({ coordinates }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.locationName}>
                    {i18n.t('markers.shared_location')}
                </Text>
            </View>
            <View>
                <Text style={styles.coordinateLabel}>
                    {i18n.t('coordinates.coordinates')}
                </Text>
                <InfoCard
                    data={[
                        [
                            i18n.t('coordinates.latitude'),
                            coordinates.latitude.toString(),
                        ],
                        [
                            i18n.t('coordinates.longitude'),
                            coordinates.longitude.toString(),
                        ],
                    ]}
                />
            </View>
        </View>
    );
};

export default SharedLocationInfo;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginHorizontal: 20,
    },
    titleRow: {
        paddingVertical: 12,
        marginBottom: 12,
    },
    locationName: {
        fontWeight: '400',
        fontSize: 21,
        lineHeight: 24,
        color: Colors.black,
        paddingTop: 2,
        paddingBottom: 2,
    },
    coordinateLabel: {
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 22,
        color: Colors.black,
        paddingBottom: Constants.SPACING_UNIT_8,
    },
});
