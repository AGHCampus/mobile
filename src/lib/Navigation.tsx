import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LatLng } from 'react-native-maps';
import {
    CommonActions,
    NavigationContainerRef,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type TabsParamList = {
    Map: undefined | { eventLocation: LatLng };
    Events: undefined;
    Offers: undefined;
    Info: undefined;
};

export type TabNavigation = BottomTabNavigationProp<TabsParamList>;

export type StackParamList = {
    Home: TabsParamList;
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
