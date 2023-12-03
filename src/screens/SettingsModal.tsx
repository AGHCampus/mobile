import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalSpacer } from '../components/Spacers';
import Profile from '../components/Settings/Profile';
import LearnMoreLinks from '../components/Settings/LearnMoreLinks';
import SettingRow from '../components/Settings/SettingRow';
import i18n from '../utils/i18n';
import AghLogo from '../../assets/Agh.png';
import { StackNavigation } from '../lib/Navigation';
import { logout, useAppDispatch, useAppSelector } from '../lib/Store';
import { shareCurrentLocation } from '../utils/sharing';

export default function SettingsModal() {
    const navigation = useNavigation<StackNavigation>();
    const username = useAppSelector(state => state.username);
    const email = useAppSelector(state => state.email);
    const dispatch = useAppDispatch();
    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    <View style={styles.accountAndLinksContainer}>
                        {username && (
                            <>
                                <Profile
                                    username={username}
                                    email={email ?? ''}
                                />
                                <VerticalSpacer height={25} />
                                <Text style={styles.sectionTitle}>
                                    {i18n.t('settings.account')}
                                </Text>
                                <VerticalSpacer height={6} />
                                <SettingRow
                                    iconAsset={'EmptyLocation'}
                                    text={i18n.t('settings.share_location')}
                                    onPress={shareCurrentLocation}
                                />
                                <View style={styles.divider} />
                                <SettingRow
                                    iconAsset={'Calendar'}
                                    text={i18n.t('settings.create_event')}
                                    onPress={() =>
                                        navigation.navigate('CreateEvent')
                                    }
                                />
                                <View style={styles.divider} />
                                <SettingRow
                                    iconAsset={'Password'}
                                    text={i18n.t('settings.change_password')}
                                    onPress={() => {
                                        if (email) {
                                            navigation.navigate(
                                                'ChangePassword',
                                                {
                                                    email,
                                                },
                                            );
                                        }
                                    }}
                                />
                                <View style={styles.divider} />
                                <SettingRow
                                    iconAsset={'SignOut'}
                                    text={i18n.t('settings.logout')}
                                    onPress={() => {
                                        dispatch(logout());
                                    }}
                                />
                            </>
                        )}
                        {!username && (
                            <>
                                <VerticalSpacer height={10} />
                                <Text style={styles.sectionTitle}>
                                    {i18n.t('settings.account')}
                                </Text>
                                <VerticalSpacer height={6} />
                                <SettingRow
                                    iconAsset={'SignIn'}
                                    text={i18n.t('settings.login')}
                                    onPress={() => {
                                        navigation.navigate('Login');
                                    }}
                                />
                                <View style={styles.divider} />
                                <SettingRow
                                    iconAsset={'SignUp'}
                                    text={i18n.t('settings.register')}
                                    onPress={() => {
                                        navigation.navigate('Register');
                                    }}
                                />
                            </>
                        )}
                        <VerticalSpacer height={30} />
                        <LearnMoreLinks />
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={AghLogo} style={styles.logo} />
                    </View>
                </SafeAreaView>
            </View>
            <TouchableOpacity
                style={styles.opacity}
                activeOpacity={0}
                onPress={navigation.goBack}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'row',
    },
    settingsContainer: {
        marginHorizontal: 22,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    container: {
        width: '75%',
        height: '100%',
        backgroundColor: Colors.bgWhite,
    },
    opacity: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 24,
        color: Colors.accentGreen,
        textAlign: 'center',
    },
    accountAndLinksContainer: {
        marginTop: 30,
    },
    logoContainer: {
        paddingVertical: 20,
        marginBottom: 20,
    },
    logo: {
        alignSelf: 'center',
        height: 80,
        width: 80,
    },
    divider: {
        backgroundColor: Colors.bgDivider,
        width: '100%',
        height: 1,
    },
    backIcon: { width: 24, height: 24 },
    backButton: { alignSelf: 'flex-end' },
});
