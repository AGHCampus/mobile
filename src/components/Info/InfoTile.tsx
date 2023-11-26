import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Shadows } from '../../lib/Shadows';
import { Colors } from '../../lib/Colors';
import { Constants } from '../../lib/Constants';
import { getInfoDatetimeString } from '../../utils/time';
import { InfoData } from '../../api/information';
import Autolink from 'react-native-autolink';

export default function InfoTile({ title, content, timestamp }: InfoData) {
    const shareInfoContent = () => {
        Share.share({
            message: content,
        });
    };

    return (
        <TouchableOpacity
            style={[styles.container, Shadows.depth1]}
            onLongPress={shareInfoContent}>
            <View style={styles.titleRow}>
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.flexSpacer} />
                <Text style={styles.titleText}>
                    {getInfoDatetimeString(timestamp)}
                </Text>
            </View>
            <Autolink style={styles.contentText} text={content} />
        </TouchableOpacity>
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
