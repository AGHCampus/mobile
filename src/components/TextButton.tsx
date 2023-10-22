import React from 'react';
import { ColorValue, Text, TouchableOpacity } from 'react-native';
import { Constants } from '../lib/Constants';

interface Props {
    color: ColorValue;
    fontSize: number;
    label: string;
    onPress: () => void;
}

export default function TextButton({ onPress, label, fontSize, color }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY}
            onPress={onPress}>
            <Text style={{ color, fontSize }}>{label}</Text>
        </TouchableOpacity>
    );
}
