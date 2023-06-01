import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SafeView from './SafeView';

export default function InfoScreen() {
    return (
        <SafeView>
            <View style={styles.container}>
                <Text>InfoScreen</Text>
            </View>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000',
    },
});
