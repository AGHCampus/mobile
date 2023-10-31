import React, { useState, createContext } from 'react';
import {
    LogBox,
    StyleSheet,
    NativeModules,
    Platform,
    View,
    Text,
} from 'react-native';
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
import i18n from './src/utils/i18n';
import Icon from './src/components/Icon';
import { Colors } from './src/lib/Colors';
import { Constants } from './src/lib/Constants';
import useLocationsData, { LocationsMap } from './src/hooks/useLocationsData';

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

const locale =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

const EventsHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{i18n.t('tabs.events')}</Text>
            <Icon asset={'Calendar'} color={Colors.accentGreen} />
        </View>
    );
};

const OffersHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{i18n.t('tabs.offers')}</Text>
            <Icon asset={'Offer'} color={Colors.accentGreen} />
        </View>
    );
};

const InfoHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{i18n.t('tabs.info')}</Text>
            <Icon asset={'Info'} color={Colors.accentGreen} />
        </View>
    );
};

export const AppDimensionsContext =
    createContext<Dimensions>(initialDimensions);

export const LocationsDataContext = createContext<LocationsMap>({});

export default function App() {
    const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);
    i18n.locale = locale;
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

    const { locationsData } = useLocationsData();

    return (
        <LocationsDataContext.Provider value={locationsData}>
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
                                            options={{
                                                headerTitle: EventsHeader,
                                            }}
                                        />
                                        <Tab.Screen
                                            name="Offers"
                                            component={OffersScreen}
                                            options={{
                                                headerTitle: OffersHeader,
                                            }}
                                        />
                                        <Tab.Screen
                                            name="Info"
                                            component={InfoScreen}
                                            options={{
                                                headerTitle: InfoHeader,
                                            }}
                                        />
                                    </Tab.Navigator>
                                </NavigationContainer>
                            </AppDimensionsContext.Provider>
                        </BottomSheetModalProvider>
                    </GestureHandlerRootView>
                </PortalProvider>
            </SafeAreaProvider>
        </LocationsDataContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: Constants.SPACING_UNIT_10,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 22,
    },
});
