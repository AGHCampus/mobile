import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
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
import RNDateTimePicker from '@react-native-community/datetimepicker';
import type { LatLng } from 'react-native-maps';
import LocationSelector from '../components/Settings/LocationSelector';

function EventForm() {
    const navigation = useNavigation<StackNavigation>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, _] = useState(new Date());
    const [error, setError] = useState<string>('');
    const [location, setLocation] = useState<LatLng>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
    });

    const handleCreateEvent = () => {
        // TODO Proper creation
        startDateTime.setSeconds(0);
        startDateTime.setMilliseconds(0);
        console.log('Create event params:');
        console.log('title: ', title);
        console.log('description: ', description);
        console.log('startDateTime: ', startDateTime);
        console.log('location: ', location);
        if (startDateTime < new Date()) {
            setError(i18n.t('create_event.date_error'));
            return;
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <IconButton
                asset={'Left'}
                color={Colors.black}
                onPress={navigation.goBack}
                iconStyle={styles.backIcon}
                style={styles.backButton}
            />
            <VerticalSpacer height={16} />
            <Text style={styles.titleText}>{i18n.t('tabs.create_event')}</Text>
            <VerticalSpacer height={40} />
            <Text style={styles.inputLabel}>
                {i18n.t('create_event.title')}
            </Text>
            <TextInput
                value={title}
                style={styles.input}
                onChangeText={setTitle}
            />
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('create_event.start_date')}
            </Text>
            <View style={styles.row}>
                <RNDateTimePicker
                    value={startDateTime}
                    mode="date"
                    onChange={e => {
                        const date = new Date(e.nativeEvent.timestamp);
                        startDateTime.setFullYear(date.getFullYear());
                        startDateTime.setMonth(date.getMonth());
                        startDateTime.setDate(date.getDate());
                    }}
                />
                <RNDateTimePicker
                    value={startDateTime}
                    mode="time"
                    onChange={e => {
                        const date = new Date(e.nativeEvent.timestamp);
                        startDateTime.setHours(date.getHours());
                        startDateTime.setMinutes(date.getMinutes());
                    }}
                />
            </View>

            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('create_event.location')}
            </Text>
            <LocationSelector setCoordinates={setLocation} />
            <VerticalSpacer height={20} />
            <Text style={styles.inputLabel}>
                {i18n.t('create_event.description')}
            </Text>
            <TextInput
                style={styles.descriptionInput}
                value={description}
                autoCapitalize="none"
                onChangeText={setDescription}
                multiline={true}
            />
            <VerticalSpacer height={40} />
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <VerticalSpacer height={20} />
            )}
            <TouchableOpacity
                disabled={!title}
                activeOpacity={0.6}
                style={[
                    styles.button,
                    title ? styles.buttonActive : styles.buttonInactive,
                ]}
                onPress={handleCreateEvent}>
                <Text
                    style={[
                        styles.buttonText,
                        title
                            ? styles.buttonTextActive
                            : styles.buttonTextInactive,
                    ]}>
                    {i18n.t('create_event.create')}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default function CreatePrivateEventModal() {
    const navigation = useNavigation<StackNavigation>();
    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    <EventForm />
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
        width: '100%',
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
    descriptionInput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.gray,
        height: 100,
        lineHeight: 16,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    button: {
        alignSelf: 'center',
        width: '100%',
        height: Constants.TAP_UNIT_48,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
    },
    buttonInactive: {
        backgroundColor: Colors.bgWhite,
        borderColor: Colors.black,
    },
    buttonActive: {
        borderColor: Colors.bgWhite,
        backgroundColor: Colors.accentGreen,
    },
    buttonText: {
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
    buttonTextInactive: {
        color: Colors.black,
    },
    buttonTextActive: {
        color: Colors.bgWhite,
    },
    opacity: {
        flex: 1,
    },
    row: { flexDirection: 'row' },
    backIcon: { width: 24, height: 24 },
    backButton: { alignSelf: 'flex-end' },
});
