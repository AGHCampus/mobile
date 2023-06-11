import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView, Route } from 'react-native-tab-view';
import LocationDetailsTabBar from './LocationDetailsTabBar';
import { Colors } from '../lib/Colors';

const FirstRoute = () => (
    <View style={[styles.container, { backgroundColor: 'white' }]} />
);
const SecondRoute = () => (
    <View style={[styles.container, { backgroundColor: '#8f7373' }]} />
);
const ThirdRoute = () => (
    <View style={[styles.container, { backgroundColor: '#a2b8da' }]} />
);

export type RouteWithColor = Route & { color: string };

export default function TabViewExample() {
    const [index, setIndex] = useState(0);
    const [routes] = useState<RouteWithColor[]>([
        { key: 'first', title: 'Overview', color: Colors.accentGreen },
        { key: 'second', title: 'Events', color: Colors.accentPurple },
        { key: 'third', title: 'Offers', color: Colors.accentRed },
    ]);

    console.log('TabViewExample rerender');

    const renderScene = ({
        route,
    }: {
        route: Route;
    }): React.ReactElement | null => {
        switch (route.key) {
            case 'first':
                return <FirstRoute />;
            case 'second':
                return <SecondRoute />;
            case 'third':
                return <ThirdRoute />;
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={props => <LocationDetailsTabBar {...props} />}
            onIndexChange={setIndex}
            swipeEnabled={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    indicator: {
        backgroundColor: 'red',
    },
});
