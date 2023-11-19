import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import { icons } from '../Icons';

export type IconType = keyof typeof icons;

interface Props {
    asset: IconType;
    color: string;
    style?: StyleProp<ImageStyle>;
}

const Icon = ({ asset, color, style }: Props) => {
    const iconData = icons[asset];

    if (!iconData) {
        console.warn(`Missing icon for: ${asset}`);
        return null;
    }

    return (
        <View pointerEvents="none">
            <Image
                style={[styles.icon, { tintColor: color }, style]}
                source={iconData.src}
            />
        </View>
    );
};

export default Icon;

const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,
    },
    container: {
        alignSelf: 'center',
    },
});
