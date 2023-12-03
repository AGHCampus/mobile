import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
} from 'react-native';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalSpacer } from '../components/Spacers';
import i18n from '../utils/i18n';
import AghLogo from '../../assets/Agh.png';
import { StackNavigation } from '../lib/Navigation';
import {
    setUsername,
    setUserApiKey,
    useAppDispatch,
    setUserEmail,
} from '../lib/Store';
import { Constants } from '../lib/Constants';
import IconButton from '../components/IconButton';
import { login, resetPassword } from '../api/auth';
import PageTitle from '../components/Settings/PageTitle';
import Button from '../components/Settings/Button';

function LoginForm() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigation>();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loginButtonEnabled, setLoginButtonEnabled] = useState(false);

    const handleLogin = () => {
        if (email && password) {
            login(email, password).then(res => {
                if (res) {
                    if (res.status < 300) {
                        const {
                            user: { username },
                            jwt,
                        } = res.data;
                        dispatch(setUsername(username));
                        dispatch(setUserApiKey(jwt));
                        dispatch(setUserEmail(email));
                        navigation.goBack();
                    } else if (res.status < 500) {
                        setError(i18n.t('settings.credential_error'));
                    } else {
                        setError(i18n.t('settings.server_error'));
                    }
                } else {
                    setError(i18n.t('settings.server_error'));
                }
            });
        } else {
            setError(i18n.t('settings.credential_error'));
        }
    };

    const handlePasswordReset = () => {
        if (!email) {
            setError(i18n.t('settings.reset_password_error'));
        } else if (!/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError(i18n.t('settings.invalid_email_error'));
        } else {
            resetPassword(email).then(res => {
                if (res && res.status < 300) {
                    setSuccess(i18n.t('settings.reset_password_success'));
                }
            });
        }
    };

    useEffect(() => {
        setLoginButtonEnabled(email.length > 0 && password.length > 0);
        setError('');
        setSuccess('');
    }, [email, password]);

    return (
        <View style={styles.formContainer}>
            <PageTitle title={i18n.t('tabs.login')} />
            <VerticalSpacer height={25} />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                placeholder={i18n.t('settings.email_placeholder')}
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="email"
                inputMode="email"
                onChangeText={setEmail}
            />
            <VerticalSpacer height={14} />
            <Text style={styles.inputLabel}>{i18n.t('settings.password')}</Text>
            <View style={styles.row}>
                <TextInput
                    placeholder={i18n.t('settings.password_placeholder')}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />
                <IconButton
                    asset={showPassword ? 'CrossedEye' : 'Eye'}
                    color={Colors.black}
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                />
            </View>
            <View style={styles.messageContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                {!error && success && (
                    <Text style={styles.successText}>{success}</Text>
                )}
            </View>
            <Button
                text={i18n.t('settings.login_button')}
                disabled={!loginButtonEnabled}
                onPress={handleLogin}
            />
            <TouchableOpacity
                activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY}
                style={styles.resetButton}
                onPress={handlePasswordReset}>
                <Text style={styles.link}>
                    {i18n.t('settings.reset_password')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default function LoginModal() {
    const navigation = useNavigation<StackNavigation>();
    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    <LoginForm />
                    <View style={styles.logoContainer}>
                        <Image source={AghLogo} style={styles.logo} />
                    </View>
                </SafeAreaView>
            </View>
            <TouchableOpacity
                style={styles.opacity}
                activeOpacity={0}
                onPress={navigation.popToTop}
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
    formContainer: {
        marginTop: 40,
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
    container: {
        width: '75%',
        height: '100%',
        backgroundColor: Colors.bgWhite,
    },
    inputLabel: {
        fontSize: 15,
        lineHeight: 25,
    },
    input: {
        width: '100%',
        height: 44,
        paddingHorizontal: 8,
        fontSize: 14,
        lineHeight: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.inputGray,
    },
    opacity: {
        flex: 1,
    },
    backButton: {
        height: 25,
        width: 48,
        alignItems: 'flex-end',
    },
    passwordToggle: { position: 'absolute', height: 40, right: -2 },
    row: { flexDirection: 'row' },
    link: {
        fontSize: 14,
        lineHeight: 16,
        paddingHorizontal: 8,
        color: Colors.textLink,
    },
    resetButton: {
        alignSelf: 'center',
        padding: 4,
        marginTop: Constants.SPACING_UNIT_8,
    },
    messageContainer: {
        height: 60,
    },
    errorText: {
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: Constants.SPACING_UNIT_10,
        color: Colors.red,
        textAlign: 'center',
    },
    successText: {
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: Constants.SPACING_UNIT_10,
        color: Colors.green,
        textAlign: 'center',
    },
});
