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
import { StackNavigation, StackParamList } from '../lib/Navigation';
import { Constants } from '../lib/Constants';
import IconButton from '../components/IconButton';
import { changePassword } from '../api/auth';
import { StackScreenProps } from '@react-navigation/stack';
interface RegisterFormProps {
    email: string;
    onSuccess: () => void;
}

function ChangePasswordForm({ onSuccess, email }: RegisterFormProps) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = async () => {
        if (oldPassword && oldPassword && newPassword === confirmNewPassword) {
            changePassword(email, oldPassword, newPassword).then(res => {
                if (res) {
                    if (res.status < 300) {
                        onSuccess();
                    } else {
                        setError(i18n.t('settings.change_password_error'));
                    }
                } else {
                    setError(i18n.t('settings.server_error'));
                }
            });
        } else {
            if (confirmNewPassword !== newPassword) {
                setError(i18n.t('settings.password_match_error'));
                return;
            }
            setError(i18n.t('settings.change_password_error'));
        }
    };

    useEffect(() => {
        setButtonEnabled(
            oldPassword.length > 0 &&
                newPassword.length > 0 &&
                confirmNewPassword.length > 0,
        );
        setError('');
    }, [oldPassword, newPassword, confirmNewPassword]);

    return (
        <>
            <Text style={styles.inputLabel}>
                {i18n.t('settings.old_password')}
            </Text>
            <View style={styles.row}>
                <TextInput
                    secureTextEntry={!showOldPassword}
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={setOldPassword}
                />
                <IconButton
                    asset={showOldPassword ? 'CrossedEye' : 'Eye'}
                    color={Colors.black}
                    onPress={() => setShowOldPassword(!showOldPassword)}
                    style={styles.passwordToggle}
                />
            </View>
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('settings.new_password')}
            </Text>
            <View style={styles.row}>
                <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={setNewPassword}
                />
                <IconButton
                    asset={showPassword ? 'CrossedEye' : 'Eye'}
                    color={Colors.black}
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                />
            </View>

            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('settings.confirm_new_password')}
            </Text>
            <View style={styles.row}>
                <TextInput
                    secureTextEntry={!showConfirmPassword}
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={setConfirmNewPassword}
                />
                <IconButton
                    asset={showConfirmPassword ? 'CrossedEye' : 'Eye'}
                    color={Colors.black}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                />
            </View>

            <VerticalSpacer height={40} />

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <VerticalSpacer height={20} />
            )}

            <TouchableOpacity
                disabled={!buttonEnabled}
                activeOpacity={0.6}
                style={[
                    styles.RegisterButton,
                    buttonEnabled
                        ? styles.RegisterButtonActive
                        : styles.RegisterButtonInactive,
                ]}
                onPress={handlePasswordChange}>
                <Text
                    style={[
                        styles.RegisterButtonText,
                        buttonEnabled
                            ? styles.RegisterButtonTextActive
                            : styles.RegisterButtonTextInactive,
                    ]}>
                    {i18n.t('settings.change_password')}
                </Text>
            </TouchableOpacity>
        </>
    );
}

export default function ChangePasswordModal({
    route,
}: StackScreenProps<StackParamList, 'ChangePassword'>) {
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const navigation = useNavigation<StackNavigation>();
    const { email } = route.params;

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
                        {i18n.t('tabs.change_password')}
                    </Text>
                    <VerticalSpacer height={40} />
                    {passwordChangeSuccess && (
                        <Text style={styles.inputLabel}>
                            {i18n.t('settings.change_password_success')}
                        </Text>
                    )}
                    {!passwordChangeSuccess && (
                        <ChangePasswordForm
                            onSuccess={() => setPasswordChangeSuccess(true)}
                            email={email}
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
        width: '100%',
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
    passwordToggle: { position: 'absolute', height: 40, right: -2 },
    row: { flexDirection: 'row' },
});
