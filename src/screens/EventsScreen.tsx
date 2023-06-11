import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeView from './SafeView';

import AccentButton from '../components/AccentButton';
import { Colors } from '../lib/Colors';

import TabViewExample from '../components/LocationDetailsTabView';

export default class EventsScreen extends Component {
    render(): React.ReactNode {
        return (
            <SafeView style={styles.container}>
                <TabViewExample />
            </SafeView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
