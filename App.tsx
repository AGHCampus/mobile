import React, { useState, createContext } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MapScreen from './src/screens/MapScreen';
import EventsScreen from './src/screens/EventsScreen';
import OffersScreen from './src/screens/OffersScreen';
import InfoScreen from './src/screens/InfoScreen';
import TabNavigationRow from './src/components/TabNavigatorRow';
import { TabsParamList } from './src/screens/navigationTypes';

// TODO: Investigate the warnings or move this somewhere else
LogBox.ignoreLogs(['Overriding previous layout', 'Encountered']);

const navigationOptions = {
    headerShown: true,
};

const Tab = createBottomTabNavigator<TabsParamList>();

export interface Dimensions {
    height: number;
    width: number;
}

const initialDimensions = {
    height: 0,
    width: 0,
};

export const AppDimensionsContext =
    createContext<Dimensions>(initialDimensions);

export default function App() {
    const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);

    const renderTabBar = ({
        state,
        descriptors,
        navigation,
    }: BottomTabBarProps) => {
        return (
            <TabNavigationRow
                state={state}
                descriptors={descriptors}
                navigation={navigation}
            />
        );
    };

    return (
        <SafeAreaProvider
            onLayout={event => {
                const { width, height } = event.nativeEvent.layout;
                setDimensions({ height, width });
            }}>
            <PortalProvider>
                <GestureHandlerRootView style={styles.container}>
                    <BottomSheetModalProvider>
                        <AppDimensionsContext.Provider value={dimensions}>
                            <NavigationContainer>
                                <Tab.Navigator
                                    tabBar={renderTabBar}
                                    screenOptions={navigationOptions}
                                    initialRouteName="Map">
                                    <Tab.Screen
                                        name="Map"
                                        component={MapScreen}
                                    />
                                    <Tab.Screen
                                        name="Events"
                                        component={EventsScreen}
                                    />
                                    <Tab.Screen
                                        name="Offers"
                                        component={OffersScreen}
                                    />
                                    <Tab.Screen
                                        name="Info"
                                        component={InfoScreen}
                                    />
                                </Tab.Navigator>
                            </NavigationContainer>
                        </AppDimensionsContext.Provider>
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </PortalProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
