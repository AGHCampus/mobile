import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../lib/Colors';

const BottomSpacer = () => {
    const insets = useSafeAreaInsets();
    return <View style={{ height: insets.bottom, ...styles.view }} />;
};

export default BottomSpacer;

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.bgWhite,
    },
});
