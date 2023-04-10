import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { icons } from '../Icons';

export type IconType = keyof typeof icons;

interface Props {
	asset: IconType;
	color: string;
}

const Icon = ({ asset, color }: Props) => {
	const iconData = icons[asset];

	if (!iconData) {
		console.warn(`Missing icon for: ${asset}`);
		return null;
	}

	return (
		<View>
			<Image
				style={[styles.icon, { tintColor: color }]}
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
		marginTop: 4,
	},
	container: {},
});
