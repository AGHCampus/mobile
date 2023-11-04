import React, { useState, createContext } from 'react';
import { LogBox, StyleSheet, NativeModules, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/utils/i18n';
import { Colors } from './src/lib/Colors';
import { Constants } from './src/lib/Constants';
import useLocationsData, { LocationsMap } from './src/hooks/useLocationsData';
import { setTopLevelNavigator } from './src/lib/Navigation';
import MainStackNavigator from './src/components/navigation/MainStackNavigator';
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from './src/lib/Store';

// TODO: Investigate the warnings or move this somewhere else
LogBox.ignoreLogs(['Overriding previous layout', 'Encountered']);

export interface Dimensions {
    height: number;
    width: number;
}

const initialDimensions = {
    height: 0,
    width: 0,
};

const locale = (
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier
).replace('_', '-');

export const AppDimensionsContext =
    createContext<Dimensions>(initialDimensions);

export const LocationsDataContext = createContext<LocationsMap>({});

export default function App() {
    const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);
    i18n.locale = locale;

    const { locationsData } = useLocationsData();

    return (
        <ReduxStoreProvider store={store}>
            <LocationsDataContext.Provider value={locationsData}>
                <SafeAreaProvider
                    onLayout={event => {
                        const { width, height } = event.nativeEvent.layout;
                        setDimensions({ height, width });
                    }}>
                    <PortalProvider>
                        <GestureHandlerRootView style={styles.container}>
                            <BottomSheetModalProvider>
                                <AppDimensionsContext.Provider
                                    value={dimensions}>
                                    <NavigationContainer
                                        ref={navigatorRef =>
                                            setTopLevelNavigator(
                                                navigatorRef ?? undefined,
                                            )
                                        }>
                                        <MainStackNavigator />
                                    </NavigationContainer>
                                </AppDimensionsContext.Provider>
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </PortalProvider>
                </SafeAreaProvider>
            </LocationsDataContext.Provider>
        </ReduxStoreProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerOuterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    headerInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: Constants.SPACING_UNIT_10,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 22,
        color: Colors.black,
    },
});
