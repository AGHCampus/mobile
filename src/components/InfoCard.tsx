import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';
import { Shadows } from '../lib/Shadows';

interface Props {
    data: [string, string][];
}

export default function InfoCard({ data }: Props) {
    return (
        <View style={[styles.card, Shadows.depth2]}>
            {data.map(([title, text], index) => (
                <View key={index}>
                    {index !== 0 && <View style={styles.divider} />}
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.bgGray,
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        padding: Constants.SPACING_UNIT_16,
    },
    title: {
        fontWeight: '300',
        fontSize: 12,
        lineHeight: 16,
        color: Colors.textGray,
        marginBottom: 2,
    },
    text: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 20,
    },
    divider: {
        backgroundColor: Colors.bgDivider,
        width: '100%',
        height: 1,
        marginVertical: Constants.SPACING_UNIT_16,
    },
});
