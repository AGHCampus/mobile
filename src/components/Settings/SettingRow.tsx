import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon, { IconType } from '../Icon';
import { Colors } from '../../lib/Colors';
import { Constants } from '../../lib/Constants';

interface Props {
    text: string;
    onPress: () => void;
    iconAsset?: IconType;
}

export default function SettingRow({ iconAsset, text, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {iconAsset && (
                <Icon
                    asset={iconAsset}
                    color={Colors.black}
                    style={styles.icon}
                />
            )}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        alignContent: 'center',
    },
    icon: {
        width: 18,
        height: 18,
        marginLeft: Constants.SPACING_UNIT_10,
        marginRight: Constants.SPACING_UNIT_16,
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
    },
});
