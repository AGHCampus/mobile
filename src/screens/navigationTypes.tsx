import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { LatLng } from 'react-native-maps';

export type TabsParamList = {
    Map:
        | undefined
        | { eventLocation?: LatLng; id?: string; coordinates?: LatLng };
    Events: undefined;
    Offers: undefined;
    Info: undefined;
};

export type TabNavigation = BottomTabNavigationProp<TabsParamList>;
