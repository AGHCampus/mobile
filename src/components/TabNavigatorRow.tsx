import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { IconType } from './Icon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import BottomSpacer from './BottomSpacer';

export default class TabNavigationRow extends Component<BottomTabBarProps> {
	static defaultProps = {
		insets: {},
	};
	getAssetForLabel(label: string): IconType {
		switch (label) {
			case 'Offers':
				return 'Offer';
			case 'Events':
				return 'Calendar';
			default:
				return label as IconType;
		}
	}

	render(): ReactNode {
		const { state, descriptors, navigation } = this.props;
		return (
			<React.Fragment>
				<View style={styles.row}>
					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key];
						const label = options.title ?? route.name;
						const isFocused = state.index === index;
						const tabColor = isFocused ? '#199517' : 'black';

						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								// The `merge: true` option makes sure that the params inside the tab screen are preserved
								navigation.navigate({
									name: route.name,
									params: route.params,
									merge: true,
								});
							}
						};

						const onLongPress = () => {
							navigation.emit({
								type: 'tabLongPress',
								target: route.key,
							});
						};

						return (
							<TouchableOpacity
								accessibilityRole="button"
								accessibilityState={
									isFocused ? { selected: true } : {}
								}
								accessibilityLabel={
									options.tabBarAccessibilityLabel
								}
								testID={options.tabBarTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={styles.buttonContainer}>
								<Icon
									asset={this.getAssetForLabel(label)}
									color={tabColor}
								/>
								<Text
									style={{
										color: tabColor,
									}}>
									{label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<BottomSpacer />
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		height: 40,
		width: '100%',
	},

	buttonContainer: {
		flex: 1,
		alignItems: 'center',
	},
});
