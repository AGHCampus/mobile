import React from 'react';
import {
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    StyleSheet,
    Text,
} from 'react-native';
import Icon, { IconType } from './Icon';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';

enum ButtonVariant {
    PRIMARY,
    SECONDARY,
}

function getButtonStyle(buttonVariant: ButtonVariant, accentColor: string) {
    switch (buttonVariant) {
        case ButtonVariant.PRIMARY:
            return {
                textColor: Colors.bgWhite,
                backgroundColor: accentColor,
                borderColor: 'transparent',
                borderWidth: 0,
            };
        case ButtonVariant.SECONDARY:
            return {
                textColor: accentColor,
                backgroundColor: 'transparent',
                borderColor: accentColor,
                borderWidth: 1,
            };
    }
}

interface AccentButtonProps {
    icon: IconType;
    color: string;
    onPress: () => void;
    label?: string;
    style?: StyleProp<ViewStyle>;
}

type Props = AccentButtonProps & { variant: ButtonVariant };

const AccentButton = ({
    variant,
    icon,
    color,
    onPress,
    label,
    style,
}: Props) => {
    const { textColor, backgroundColor, borderColor, borderWidth } =
        getButtonStyle(variant, color);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor,
                    borderColor,
                    borderWidth,
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
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default {
    Primary: (props: AccentButtonProps) => (
        <AccentButton variant={ButtonVariant.PRIMARY} {...props} />
    ),
    Secondary: (props: AccentButtonProps) => (
        <AccentButton variant={ButtonVariant.SECONDARY} {...props} />
    ),
};

const styles = StyleSheet.create({
    container: {
        height: 38,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: Constants.SPACING_UNIT_10,
        borderRadius: 19,
        borderColor: 'transparent',
        paddingHorizontal: Constants.SPACING_UNIT_16 + 2,
    },
    icon: {
        width: 16,
        height: 16,
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
    },
});
