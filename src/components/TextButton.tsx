import React from 'react';
import { ColorValue, Text, TouchableWithoutFeedback } from 'react-native';

interface Props {
    color: ColorValue;
    label: string;
    onPress: () => void;
}

export default function TextButton({ onPress, label, color }: Props) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={{ color }}>{label}</Text>
        </TouchableWithoutFeedback>
    );
}
