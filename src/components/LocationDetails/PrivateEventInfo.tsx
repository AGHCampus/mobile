import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../lib/Colors';
import i18n from '../../utils/i18n';
import { Constants } from '../../lib/Constants';
import InfoCard from '../InfoCard';
import { getEventDatetimeStringLong } from '../../utils/time';
import { PrivateEventData } from '../../api/events';

interface Props {
    eventDetails: PrivateEventData;
}

export default function PrivateEventInfo({
    eventDetails: { title, description, startDate },
}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.locationName}>{title}</Text>
            </View>
            <View>
                <Text style={styles.coordinateLabel}>
                    {i18n.t('events.info')}
                </Text>
                <InfoCard
                    data={[
                        [
                            i18n.t('events.startTime'),
                            getEventDatetimeStringLong(new Date(startDate)),
                        ],
                        [i18n.t('events.description'), description],
                    ]}
                />
            </View>
        </View>
    );
}

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
