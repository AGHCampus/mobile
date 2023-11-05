import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon, { IconType } from './Icon';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';
import { Shadows } from '../lib/Shadows';
import i18n from '../utils/i18n';

interface Props {
    isSelected: boolean;
    category: string;
    toggleCategory: (category: string) => void;
}

function getButtonParamsForCategory(category: string): {
    accentColor: string;
    asset: IconType;
} {
    switch (category) {
        case 'faculty':
            return {
                accentColor: Colors.accentGreen,
                asset: 'Faculty',
            };
        case 'dormitory':
            return {
                accentColor: Colors.accentBlue,
                asset: 'Dorm',
            };
        case 'shop':
            return {
                accentColor: Colors.accentRed,
                asset: 'Shop',
            };
        case 'club':
            return {
                accentColor: Colors.accentYellow,
                asset: 'Club',
            };
        case 'restaurant':
            return {
                accentColor: Colors.accentRed,
                asset: 'Restaurant',
            };
        default:
            return {
                accentColor: Colors.accentGreen,
                asset: 'Info',
            };
    }
}

export default function MapFilterButton({
    isSelected,
    category,
    toggleCategory,
}: Props) {
    const { accentColor, asset } = getButtonParamsForCategory(category);
    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                Shadows.depth1,
                { borderColor: accentColor },
                isSelected && { backgroundColor: accentColor },
            ]}
            onPress={() => toggleCategory(category)}>
            <Icon
                asset={asset}
                color={isSelected ? Colors.bgWhite : accentColor}
                style={styles.icon}
            />
            <Text
                style={[
                    styles.text,
                    { color: isSelected ? Colors.bgWhite : accentColor },
                ]}>
                {i18n.t(`categories.${category}`)}
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    filterButton: {
        flexDirection: 'row',
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        borderWidth: 1,
        height: 28,
        marginRight: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bgWhite,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
    },
});
