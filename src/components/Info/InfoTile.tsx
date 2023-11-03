import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Shadows } from '../../lib/Shadows';
import { Colors } from '../../lib/Colors';
import { Constants } from '../../lib/Constants';
import { getInfoDatetimeString } from '../../utils/time';
import { InfoData } from '../../api/information';

export default function InfoTile({ title, content, timestamp }: InfoData) {
    return (
        <View style={[styles.container, Shadows.depth1]}>
            <View style={styles.titleRow}>
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.flexSpacer} />
                <Text style={styles.titleText}>
                    {getInfoDatetimeString(timestamp)}
                </Text>
            </View>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgGray,
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        padding: Constants.SPACING_UNIT_16,
        marginHorizontal: Constants.SPACING_UNIT_10,
    },
    flexSpacer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 4,
    },
    titleText: {
        fontWeight: '300',
        fontSize: 13,
        lineHeight: 16,
        color: Colors.textGray,
    },
    contentText: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
        color: Colors.black,
    },
});
