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
import { Constants } from '../lib/Constants';
import IconButton from '../components/IconButton';
interface RegisterFormProps {
    onSuccess: () => void;
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [RegisterButtonEnabled, setRegisterButtonEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // TODO: Add proper register
        if (email && password && password === confirmPassword) {
            onSuccess();
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
        <>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setEmail}
            />
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>{i18n.t('settings.password')}</Text>
            <TextInput
                secureTextEntry={!showPassword}
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setPassword}
            />
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('settings.confirm_password')}
            </Text>
            <TextInput
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setConfirmPassword}
            />
            <VerticalSpacer height={40} />

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <VerticalSpacer height={20} />
            )}

            <TouchableOpacity
                disabled={!RegisterButtonEnabled}
                activeOpacity={0.6}
                style={[
                    styles.RegisterButton,
                    RegisterButtonEnabled
                        ? styles.RegisterButtonActive
                        : styles.RegisterButtonInactive,
                ]}
                onPress={handleRegister}>
                <Text
                    style={[
                        styles.RegisterButtonText,
                        RegisterButtonEnabled
                            ? styles.RegisterButtonTextActive
                            : styles.RegisterButtonTextInactive,
                    ]}>
                    {i18n.t('settings.register')}
                </Text>
            </TouchableOpacity>
        </>
    );
}

export default function RegisterModal() {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigation = useNavigation<StackNavigation>();

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
                    <Text style={styles.titleText}>
                        {i18n.t('tabs.register')}
                    </Text>
                    <VerticalSpacer height={40} />
                    {registerSuccess && (
                        <Text style={styles.inputLabel}>
                            {i18n.t('settings.register_success')}
                        </Text>
                    )}
                    {!registerSuccess && (
                        <RegisterForm
                            onSuccess={() => setRegisterSuccess(true)}
                        />
                    )}
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
    },
    RegisterButton: {
        alignSelf: 'center',
        width: '100%',
        height: Constants.TAP_UNIT_48,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,

        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
    },
    RegisterButtonInactive: {
        backgroundColor: Colors.bgWhite,
        borderColor: Colors.black,
    },
    RegisterButtonActive: {
        borderColor: Colors.bgWhite,
        backgroundColor: Colors.accentGreen,
    },
    RegisterButtonText: {
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
    RegisterButtonTextInactive: {
        color: Colors.black,
    },
    RegisterButtonTextActive: {
        color: Colors.bgWhite,
    },
    opacity: {
        flex: 1,
    },
    backIcon: { width: 24, height: 24 },
    backButton: { alignSelf: 'flex-end' },
});
