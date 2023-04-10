import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './src/MapScreen';
import EventsScreen from './src/EventsScreen';
import OffersScreen from './src/OffersScreen';
import InfoScreen from './src/InfoScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const navigationOptions = {
	headerShown: true,
};

export default class App extends React.Component {
	componentDidMount() {}

	render(): React.ReactNode {
		return (
			<NavigationContainer>
				<Tab.Navigator
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
