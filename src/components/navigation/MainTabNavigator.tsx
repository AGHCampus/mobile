import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { TabsParamList } from '../../lib/Navigation';
import i18n from '../../utils/i18n';
import { Colors } from '../../lib/Colors';
import Icon from '../Icon';
import TabNavigationRow from '../TabNavigatorRow';
import MapScreen from '../../screens/MapScreen';
import EventsScreen from '../../screens/EventsScreen';
import OffersScreen from '../../screens/OffersScreen';
import InfoScreen from '../../screens/InfoScreen';
import { Constants } from '../../lib/Constants';

const navigationOptions = {
    headerShown: true,
};

const Tab = createBottomTabNavigator<TabsParamList>();

const EventsHeader = () => {
    return (
        <View style={styles.headerOuterContainer}>
            <View style={styles.headerInnerContainer}>
                <Text style={styles.headerText}>{i18n.t('tabs.events')}</Text>
                <Icon asset={'Calendar'} color={Colors.accentGreen} />
            </View>
        </View>
    );
};

const OffersHeader = () => {
    return (
        <View style={styles.headerOuterContainer}>
            <View style={styles.headerInnerContainer}>
                <Text style={styles.headerText}>{i18n.t('tabs.offers')}</Text>
                <Icon asset={'Offer'} color={Colors.accentGreen} />
            </View>
        </View>
    );
};

const InfoHeader = () => {
    return (
        <View style={styles.headerOuterContainer}>
            <View style={styles.headerInnerContainer}>
                <Text style={styles.headerText}>{i18n.t('tabs.info')}</Text>
                <Icon asset={'Info'} color={Colors.accentGreen} />
            </View>
        </View>
    );
};

export default function MainTabNavigator() {
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
        <Tab.Navigator
            tabBar={renderTabBar}
            screenOptions={navigationOptions}
            initialRouteName="Map">
            <Tab.Screen name="Map" component={MapScreen} />
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
