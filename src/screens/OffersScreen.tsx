import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SafeView from './SafeView';

export default class OffersScreen extends Component {
	render(): React.ReactNode {
		return (
			<SafeView>
				<View>
					<Text>OffersScreen</Text>
				</View>
			</SafeView>
		);
	}
}
