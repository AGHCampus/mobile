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
import { Constants } from '../lib/Constants';
import IconButton from '../components/IconButton';
import { register } from '../api/auth';
import PageTitle from '../components/Settings/PageTitle';
import Button from '../components/Settings/Button';
interface RegisterFormProps {
    onSuccess: () => void;
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [RegisterButtonEnabled, setRegisterButtonEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (email && password && password === confirmPassword) {
            register(email, username, password).then(res => {
                if (res) {
                    if (res.status < 300) {
                        onSuccess();
                    } else {
                        setError(i18n.t('settings.register_error'));
                    }
                } else {
                    setError(i18n.t('settings.register_error'));
                }
            });
        } else {
            if (confirmPassword !== password) {
                setError(i18n.t('settings.password_match_error'));
                return;
            }
            setError(i18n.t('settings.register_error'));
        }
    };

    useEffect(() => {
        setRegisterButtonEnabled(
            email.length > 0 &&
                password.length > 0 &&
                confirmPassword.length > 0,
        );
        setError('');
    }, [email, password, confirmPassword]);

    return (
        <View style={styles.formContainer}>
            <PageTitle title={i18n.t('tabs.register')} />
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
            <Text style={styles.inputLabel}>{i18n.t('settings.username')}</Text>
            <TextInput
                placeholder={i18n.t('settings.username_placeholder')}
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setUsername}
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
            <VerticalSpacer height={14} />
            <Text style={styles.inputLabel}>
                {i18n.t('settings.confirm_password')}
            </Text>
            <View style={styles.row}>
                <TextInput
                    placeholder={i18n.t('settings.password_placeholder')}
                    secureTextEntry={!showConfirmPassword}
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={setConfirmPassword}
                />
                <IconButton
                    asset={showConfirmPassword ? 'CrossedEye' : 'Eye'}
                    color={Colors.black}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                />
            </View>
            <View style={styles.messageContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Button
                text={i18n.t('settings.register_button')}
                disabled={!RegisterButtonEnabled}
                onPress={handleRegister}
            />
        </View>
    );
}

export default function RegisterModal() {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigation = useNavigation<StackNavigation>();

    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    {registerSuccess && (
                        <View style={styles.formContainer}>
                            <PageTitle title={i18n.t('tabs.register')} />
                            <VerticalSpacer height={14} />
                            <Text style={styles.successTitle}>
                                {i18n.t('settings.register_success_title')}
                            </Text>
                            <Text style={styles.successText}>
                                {i18n.t('settings.register_success')}
                            </Text>
                        </View>
                    )}
                    {!registerSuccess && (
                        <RegisterForm
                            onSuccess={() => setRegisterSuccess(true)}
                        />
                    )}
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
    successTitle: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 20,
        color: Colors.black,
        textAlign: 'center',
        paddingTop: 20,
    },
    successText: {
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: Constants.SPACING_UNIT_8,
        color: Colors.textGray,
        textAlign: 'center',
    },
    opacity: {
        flex: 1,
    },
    passwordToggle: { position: 'absolute', height: 40, right: -2 },
    row: { flexDirection: 'row' },
});
