import React from 'react';
import {
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    StyleSheet,
    View,
    GestureResponderEvent,
    ImageStyle,
} from 'react-native';
import Icon, { IconType } from './Icon';
import { Constants } from '../lib/Constants';

interface Props {
    asset: IconType;
    color: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ImageStyle>;
}

const IconButton = ({ asset, color, onPress, style, iconStyle }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.iconContainer, style]}>
                <Icon
                    asset={asset}
                    color={color}
                    style={[styles.icon, iconStyle]}
                />
            </View>
        </TouchableOpacity>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Constants.TAP_UNIT_48,
        height: Constants.TAP_UNIT_48,
    },
    icon: {
        width: 18,
        height: 18,
    },
});
