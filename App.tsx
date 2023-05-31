import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './src/screens/MapScreen';
import EventsScreen from './src/screens/EventsScreen';
import OffersScreen from './src/screens/OffersScreen';
import InfoScreen from './src/screens/InfoScreen';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabNavigationRow from './src/components/TabNavigatorRow';

const Tab = createBottomTabNavigator();

const navigationOptions = {
    headerShown: false,
};

export default class App extends React.Component {
    componentDidMount() {}

    renderTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
        return (
            <TabNavigationRow
                state={state}
                descriptors={descriptors}
                navigation={navigation}
            />
        );
    }

    render(): React.ReactNode {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBar={this.renderTabBar}
                    screenOptions={navigationOptions}
                    initialRouteName="Map">
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Events" component={EventsScreen} />
                    <Tab.Screen name="Offers" component={OffersScreen} />
                    <Tab.Screen name="Info" component={InfoScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
