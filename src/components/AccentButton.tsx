import React, { PropsWithChildren } from 'react';
import {
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon, { IconType } from './Icon';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';

export type ButtonVariant = 'primary' | 'secondary';

interface Props {
    variant: ButtonVariant;
    icon: IconType;
    color: string;
    style?: StyleProp<ViewStyle>;
}

const AccentButton = ({
    variant,
    icon,
    color,
    style,
    children,
}: PropsWithChildren<Props>) => {
    const textColor = variant === 'primary' ? Colors.bgWhite : color;
    const bgColor = variant === 'primary' ? color : 'transparent';
    const borderColor = variant === 'primary' ? 'transparent' : color;
    const borderWidth = variant === 'primary' ? 0 : 1;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                },
                style,
            ]}>
            <Icon asset={icon} color={textColor} style={styles.icon} />
            <Text
                style={[
                    styles.text,
                    {
                        color: textColor,
                    },
                ]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export default AccentButton;

const styles = StyleSheet.create({
    container: {
        height: 38,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Constants.SPACING_UNIT_10,
        borderRadius: 12,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingHorizontal: Constants.SPACING_UNIT_16,
    },
    icon: {
        width: 16,
        height: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
    },
});
