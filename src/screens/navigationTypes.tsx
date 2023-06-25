import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LatLng } from 'react-native-maps';

export type TabsParamList = {
    Map: undefined | { eventLocation: LatLng };
    Events: undefined | { eventLocation: LatLng };
    Offers: undefined | { eventLocation: LatLng };
    Info: undefined | { eventLocation: LatLng };
};

export type TabNavigation = BottomTabNavigationProp<TabsParamList>;
