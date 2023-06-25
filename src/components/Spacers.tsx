import React from 'react';
import { StyleSheet, View } from 'react-native';

export function VerticalSpacer({ height }: { height: number }) {
    return <View style={{ height }} />;
}

export function HorizontalSpacer({ width }: { width: number }) {
    return <View style={{ width }} />;
}

export function FlexSpacer() {
    return <View style={styles.flexOne} />;
}

const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
});
