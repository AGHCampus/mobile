import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon, { IconType } from '../Icon';
import { Colors } from '../../lib/Colors';

interface Props {
    text: string;
    onPress: () => void;
    iconAsset?: IconType;
    divider?: boolean;
}

export default function SettingRow({
    iconAsset,
    text,
    onPress,
    divider = true,
}: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, divider && styles.divider]}
            onPress={onPress}>
            {iconAsset && (
                <Icon
                    asset={iconAsset}
                    color={Colors.black}
                    style={styles.icon}
                />
            )}
            <Text style={styles.text}>{text}</Text>
            {divider && <View style={styles.divider} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignContent: 'center',
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 16,
    },
    text: {
        fontSize: 17,
        lineHeight: 20,
    },
    divider: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
});
