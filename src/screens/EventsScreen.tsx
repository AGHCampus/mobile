import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SafeView from './SafeView';

export default class EventsScreen extends Component {
    render(): React.ReactNode {
        return (
            <SafeView>
                <View>
                    <Text>EventsScreen</Text>
                </View>
            </SafeView>
        );
    }
}
