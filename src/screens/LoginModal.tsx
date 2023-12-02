import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalSpacer } from '../components/Spacers';
import i18n from '../utils/i18n';
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

function LoginForm() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigation>();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
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
                    setError(i18n.t('settings.reset_password_success'));
                }
            });
        }
    };

    useEffect(() => {
        setLoginButtonEnabled(email.length > 0 && password.length > 0);
        setError('');
    }, [email, password]);

    return (
        <>
            <IconButton
                asset={'ArrowLeft'}
                color={Colors.black}
                onPress={navigation.goBack}
                iconStyle={styles.backIcon}
                style={styles.backButton}
            />
            <VerticalSpacer height={16} />
            <Text style={styles.titleText}>{i18n.t('tabs.login')}</Text>
            <VerticalSpacer height={40} />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>{i18n.t('settings.password')}</Text>
            <View style={styles.row}>
                <TextInput
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
            <VerticalSpacer height={40} />
            <View style={styles.errorContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.resetButton}
                onPress={handlePasswordReset}>
                <Text style={styles.underline}>
                    {i18n.t('settings.reset_password')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={!loginButtonEnabled}
                activeOpacity={0.6}
                style={[
                    styles.loginButton,
                    loginButtonEnabled
                        ? styles.loginButtonActive
                        : styles.loginButtonInactive,
                ]}
                onPress={handleLogin}>
                <Text
                    style={[
                        styles.loginButtonText,
                        loginButtonEnabled
                            ? styles.loginButtonTextActive
                            : styles.loginButtonTextInactive,
                    ]}>
                    {i18n.t('settings.login')}
                </Text>
            </TouchableOpacity>
        </>
    );
}

export default function LoginModal() {
    const navigation = useNavigation<StackNavigation>();
    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    <LoginForm />
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
    },
    titleText: {
        fontSize: 20,
        lineHeight: 24,
        color: Colors.accentGreen,
        textAlign: 'center',
    },
    container: {
        width: '75%',
        height: '100%',
        backgroundColor: Colors.bgWhite,
    },
    inputLabel: {
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 4,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.gray,
        height: 40,
        lineHeight: 16,
        paddingHorizontal: 8,
        fontSize: 14,
        width: '100%',
    },
    loginButton: {
        alignSelf: 'center',
        width: '100%',
        height: Constants.TAP_UNIT_48,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,

        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
    },
    loginButtonInactive: {
        backgroundColor: Colors.bgWhite,
        borderColor: Colors.black,
    },
    loginButtonActive: {
        borderColor: Colors.bgWhite,
        backgroundColor: Colors.accentGreen,
    },
    loginButtonText: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 22,
        fontWeight: '500',
    },
    errorText: {
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 4,
        fontWeight: '500',
        color: Colors.red,
        textAlign: 'center',
    },
    loginButtonTextInactive: {
        color: Colors.black,
    },
    loginButtonTextActive: {
        color: Colors.bgWhite,
    },
    opacity: {
        flex: 1,
    },
    backIcon: { width: 24, height: 24 },
    backButton: { alignSelf: 'flex-end' },
    passwordToggle: { position: 'absolute', height: 40, right: -2 },
    row: { flexDirection: 'row' },
    underline: {
        textDecorationLine: 'underline',
        lineHeight: 16,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    resetButton: {
        alignSelf: 'center',
        padding: 4,
        marginBottom: 8,
    },
    errorContainer: {
        height: 40,
    },
});
