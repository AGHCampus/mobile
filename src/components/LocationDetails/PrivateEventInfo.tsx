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
                <Text style={styles.infoLabel}>{i18n.t('events.info')}</Text>
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
        paddingTop: 12,
        paddingBottom: 10,
    },
    locationName: {
        fontWeight: '300',
        fontSize: 24,
        lineHeight: 24,
        color: Colors.accentGreen,
        paddingTop: 2,
        paddingBottom: 2,
    },
    infoLabel: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 20,
        color: Colors.black,
        paddingBottom: Constants.SPACING_UNIT_8,
    },
});
