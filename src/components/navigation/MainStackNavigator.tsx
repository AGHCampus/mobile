import React from 'react';
import { StackParamList } from '../../lib/Navigation';
import MainTabNavigator from './MainTabNavigator';
import SettingsModal from '../../screens/SettingsModal';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import LoginModal from '../../screens/LoginModal';
import RegisterModal from '../../screens/RegisterModal';
import SearchModal from '../../screens/SearchModal';
import CreatePrivateEventModal from '../../screens/CreatePrivateEventModal';
import ChangePasswordModal from '../../screens/ChangePasswordModal';

const navigationOptions = {
    headerShown: false,
};
const Stack = createStackNavigator<StackParamList>();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={navigationOptions}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={MainTabNavigator} />
            <Stack.Screen
                name="Settings"
                component={SettingsModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    cardOverlayEnabled: true,
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    cardOverlayEnabled: false,
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    cardOverlayEnabled: false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={SearchModal}
                options={{
                    presentation: 'modal',
                    ...TransitionPresets.ModalFadeTransition,
                }}
            />
            <Stack.Screen
                name="CreateEvent"
                component={CreatePrivateEventModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    cardOverlayEnabled: false,
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordModal}
                options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    cardOverlayEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}
