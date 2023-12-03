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
                accentColor: Colors.faculty,
                asset: 'Faculty',
            };
        case 'dormitory':
            return {
                accentColor: Colors.dormitory,
                asset: 'Dorm',
            };
        case 'shop':
            return {
                accentColor: Colors.shop,
                asset: 'Shop',
            };
        case 'club':
            return {
                accentColor: Colors.club,
                asset: 'Club',
            };
        case 'restaurant':
            return {
                accentColor: Colors.restaurant,
                asset: 'Restaurant',
            };
        default:
            return {
                accentColor: Colors.black,
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
            activeOpacity={0.9}
            style={[styles.filterButton, Shadows.depth1]}
            onPress={() => toggleCategory(category)}>
            <Icon
                asset={asset}
                color={isSelected ? accentColor : Colors.inactiveGray}
                style={styles.icon}
            />
            <Text
                style={[
                    styles.text,
                    { color: isSelected ? accentColor : Colors.inactiveGray },
                ]}>
                {i18n.t(`categories.${category}`)}
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    filterButton: {
        flexDirection: 'row',
        borderRadius: 16,
        height: 32,
        marginRight: Constants.SPACING_UNIT_8,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bgWhite,
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
        marginBottom: 1,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
    },
});
