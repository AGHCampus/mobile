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
import { StackNavigation, StackParamList } from '../lib/Navigation';
import { Constants } from '../lib/Constants';
import IconButton from '../components/IconButton';
import { changePassword } from '../api/auth';
import { StackScreenProps } from '@react-navigation/stack';
import PageTitle from '../components/Settings/PageTitle';
import Button from '../components/Settings/Button';
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
        if (oldPassword && newPassword && newPassword === confirmNewPassword) {
            changePassword(email, oldPassword, newPassword).then(res => {
                if (res) {
                    if (res.status < 300) {
                        onSuccess();
                    } else {
                        setError(i18n.t('settings.change_password_error'));
                    }
                } else {
                    setError(i18n.t('settings.change_password_error'));
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
        <View style={styles.formContainer}>
            <PageTitle title={i18n.t('tabs.change_password')} />
            <VerticalSpacer height={25} />
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
            <VerticalSpacer height={14} />
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
            <VerticalSpacer height={14} />
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
            <View style={styles.messageContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Button
                text={i18n.t('settings.change_password')}
                disabled={!buttonEnabled}
                onPress={handlePasswordChange}
            />
        </View>
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
                    {passwordChangeSuccess && (
                        <View style={styles.formContainer}>
                            <PageTitle title={i18n.t('tabs.change_password')} />
                            <VerticalSpacer height={14} />
                            <Text style={styles.successTitle}>
                                {i18n.t(
                                    'settings.change_password_success_title',
                                )}
                            </Text>
                            <Text style={styles.successText}>
                                {i18n.t('settings.change_password_success')}
                            </Text>
                        </View>
                    )}
                    {!passwordChangeSuccess && (
                        <ChangePasswordForm
                            onSuccess={() => setPasswordChangeSuccess(true)}
                            email={email}
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
