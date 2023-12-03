import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../lib/Colors';
import { Constants } from '../../lib/Constants';
import Icon, { IconType } from '../Icon';

interface Props {
    text: string;
    icon?: IconType;
    disabled: boolean;
    onPress: () => void;
}

export default function Button({ text, icon, disabled, onPress }: Props) {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY_SOFT}
            style={[
                styles.loginButton,
                disabled
                    ? styles.loginButtonInactive
                    : styles.loginButtonActive,
            ]}
            onPress={onPress}>
            <Text
                style={[
                    styles.loginButtonText,
                    disabled
                        ? styles.loginButtonTextInactive
                        : styles.loginButtonTextActive,
                ]}>
                {text}
                {icon && (
                    <Icon
                        asset={icon}
                        style={styles.iconStyle}
                        color={disabled ? Colors.textLightGray : Colors.bgWhite}
                    />
                )}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        alignSelf: 'center',
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        paddingHorizontal: Constants.SPACING_UNIT_16,
    },
    loginButtonInactive: {
        backgroundColor: Colors.bgIcon,
    },
    loginButtonActive: {
        backgroundColor: Colors.accentGreen,
    },
    loginButtonText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 18,
    },
    loginButtonTextInactive: {
        color: Colors.textLightGray,
    },
    loginButtonTextActive: {
        color: Colors.bgWhite,
    },
    iconStyle: {
        marginTop: 4,
        marginLeft: 10,
        width: 15,
        height: 15,
    },
});
