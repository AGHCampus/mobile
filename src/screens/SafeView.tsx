import React, { Component } from 'react';
import type { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default class SafeView extends Component<ViewProps> {
	render() {
		const { children, ...props } = this.props;

		return <SafeAreaView {...props}>{children}</SafeAreaView>;
	}
}
