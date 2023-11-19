import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
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
import IconButton from '../components/IconButton';
import { shareCurrentLocation } from '../utils/sharing';

// TODO: Add proper card animation
export default function SettingsModal() {
    const navigation = useNavigation<StackNavigation>();
    const username = useAppSelector(state => state.username);
    const dispatch = useAppDispatch();
    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    <IconButton
                        asset={'Left'}
                        color={Colors.black}
                        onPress={navigation.goBack}
                        iconStyle={styles.backIcon}
                        style={styles.backButton}
                    />
                    <VerticalSpacer height={16} />
                    {username && (
                        <>
                            <Profile />
                            <VerticalSpacer height={40} />
                            <SettingRow
                                iconAsset={'Location'}
                                text={i18n.t('settings.share_location')}
                                divider={true}
                                onPress={shareCurrentLocation}
                            />
                            <SettingRow
                                iconAsset={'Calendar'}
                                text={i18n.t('settings.create_event')}
                                divider={true}
                                onPress={() =>
                                    navigation.navigate('CreateEvent')
                                }
                            />
                            <SettingRow
                                iconAsset={'SignOut'}
                                text={i18n.t('settings.logout')}
                                divider={true}
                                onPress={() => {
                                    dispatch(logout());
                                }}
                            />
                        </>
                    )}
                    {!username && (
                        <>
                            <SettingRow
                                iconAsset={'Portrait'}
                                text={i18n.t('settings.login')}
                                divider={false}
                                onPress={() => {
                                    navigation.navigate('Login');
                                }}
                            />
                            <SettingRow
                                iconAsset={'SignUp'}
                                text={i18n.t('settings.register')}
                                divider={false}
                                onPress={() => {
                                    navigation.navigate('Register');
                                }}
                            />
                        </>
                    )}
                    <VerticalSpacer height={40} />

                    <LearnMoreLinks />
                    <VerticalSpacer height={80} />
                    <Image source={AghLogo} style={styles.logo} />
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
    },
    container: {
        width: '75%',
        height: '100%',
        backgroundColor: Colors.bgWhite,
    },
    opacity: {
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        height: 80,
        width: 80,
    },
    backIcon: { width: 24, height: 24 },
    backButton: { alignSelf: 'flex-end' },
});
