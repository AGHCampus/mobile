import React, { Component } from 'react';
import type { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native';

export default class SafeView extends Component<ViewProps> {
    render() {
        const { children, ...props } = this.props;

        return <SafeAreaView {...props}>{children}</SafeAreaView>;
    }
}
