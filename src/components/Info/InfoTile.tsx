import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../lib/Colors';
import { getInfoDatetimeString } from '../../utils/time';
import { Shadows } from '../../lib/Shadows';
import { VerticalSpacer } from '../Spacers';
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
            <VerticalSpacer height={8} />

            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgGray,
        borderRadius: 8,
        padding: 20,
    },
    flexSpacer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    titleText: {
        fontSize: 11,
        lineHeight: 13,
        color: Colors.textLightGray,
    },
    contentText: {
        fontSize: 14,
        lineHeight: 17,
    },
});
