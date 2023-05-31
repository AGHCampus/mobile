import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const BottomSpacer = () => {
    const insets = useSafeAreaInsets();
    return <View style={{ height: insets.bottom }} />;
};

export default BottomSpacer;
