import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LatLng } from 'react-native-maps';
import {
    CommonActions,
    LinkingOptions,
    NavigationContainerRef,
    NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type TabsParamList = {
    Map:
        | undefined
        | { eventLocation?: LatLng; id?: string; coordinates?: LatLng };
    Events: undefined;
    Offers: undefined;
    Info: undefined;
};

export type TabNavigation = BottomTabNavigationProp<TabsParamList>;

export type StackParamList = {
    Home: NavigatorScreenParams<TabsParamList>;
    Settings: undefined;
    Login: undefined;
    Register: undefined;
};

export type StackNavigation = StackNavigationProp<StackParamList>;

let topLevelNavigator: NavigationContainerRef<{}> | undefined;
let lastNavigateAction: CommonActions.Action | undefined;

export function setTopLevelNavigator(
    navigator: NavigationContainerRef<{}> | undefined,
) {
    // Store the root navigation ref to be able to dispatch actions outside of the navigation tree
    topLevelNavigator = navigator;
    if (topLevelNavigator && lastNavigateAction) {
        topLevelNavigator.dispatch(lastNavigateAction);
        lastNavigateAction = undefined;
    }
}

export const linking: LinkingOptions<StackParamList> = {
    prefixes: ['aghmap://'],
    config: {
        screens: {
            Home: {
                screens: {
                    Map: {
                        path: 'map/:id?/:coordinates?',
                        parse: {
                            id: id => `${id}`,
                            coordinates: coordinates => {
                                const [lat, lng] = coordinates.split(',');
                                const latitude = parseFloat(lat);
                                const longitude = parseFloat(lng);
                                return {
                                    latitude,
                                    longitude,
                                };
                            },
                        },
                        stringify: {
                            id: id => id,
                            coordinates: coordinates => {
                                const { latitude, longitude } = coordinates;
                                return `${latitude},${longitude}`;
                            },
                        },
                    },
                    Events: {
                        path: 'events',
                    },
                    Offers: {
                        path: 'offers',
                    },
                    Info: {
                        path: 'info',
                    },
                },
            },
        },
    },
};
