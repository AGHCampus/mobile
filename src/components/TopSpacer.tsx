import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const TopSpacer = () => {
    const insets = useSafeAreaInsets();
    return <View style={{ height: insets.top }} />;
};

export default TopSpacer;
