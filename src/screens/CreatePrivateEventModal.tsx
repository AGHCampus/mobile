import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    Share,
    KeyboardAvoidingView,
} from 'react-native';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VerticalSpacer } from '../components/Spacers';
import i18n from '../utils/i18n';
import { StackNavigation } from '../lib/Navigation';
import { Constants } from '../lib/Constants';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import type { LatLng } from 'react-native-maps';
import LocationSelector from '../components/Settings/LocationSelector';
import { createPrivateEvent } from '../api/events';
import { useAppSelector } from '../lib/Store';
import PageTitle from '../components/Settings/PageTitle';
import Button from '../components/Settings/Button';

function EventForm({ onSuccess }: { onSuccess: (id: string) => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, _] = useState(new Date());
    const [error, setError] = useState<string>('');
    const [location, setLocation] = useState<LatLng>({
        latitude: 50.065638899794024,
        longitude: 19.91969686063426,
    });
    const jwt = useAppSelector(state => state.userApiKey)!;
    const scrollViewRef = useRef<ScrollView>(null);

    const handleCreateEvent = () => {
        startDateTime.setSeconds(0);
        startDateTime.setMilliseconds(0);
        if (startDateTime < new Date()) {
            setError(i18n.t('create_event.date_error'));
            return;
        } else if (!title) {
            setError(i18n.t('create_event.title_error'));
            return;
        } else {
            createPrivateEvent(
                jwt,
                location,
                title,
                startDateTime,
                description,
            ).then(res => {
                if (res) {
                    onSuccess(res.id);
                } else {
                    setError(i18n.t('settings.server_error'));
                }
            });
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled">
                <VerticalSpacer height={40} />
                <PageTitle title={i18n.t('tabs.create_event')} />
                <VerticalSpacer height={25} />
                <Text style={styles.inputLabel}>
                    {i18n.t('create_event.title')}
                </Text>
                <TextInput
                    value={title}
                    style={styles.input}
                    onChangeText={setTitle}
                />
                <VerticalSpacer height={14} />
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
                <VerticalSpacer height={14} />
                <Text style={styles.inputLabel}>
                    {i18n.t('create_event.location')}
                </Text>
                <LocationSelector setCoordinates={setLocation} />
                <VerticalSpacer height={16} />
                <Text style={styles.inputLabel}>
                    {i18n.t('create_event.description')}
                </Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    value={description}
                    autoCapitalize="none"
                    onChangeText={setDescription}
                    multiline={true}
                    onFocus={() =>
                        setTimeout(() => {
                            scrollViewRef.current?.scrollToEnd({
                                animated: true,
                            });
                        }, 250)
                    }
                />
                <View style={styles.messageContainer}>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
                <Button
                    text={i18n.t('create_event.create')}
                    disabled={!title}
                    onPress={handleCreateEvent}
                />
                <VerticalSpacer height={30} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default function CreatePrivateEventModal() {
    const navigation = useNavigation<StackNavigation>();
    const [eventID, setEventID] = useState('');

    return (
        <View style={styles.modal}>
            <View style={[styles.container, Shadows.depth2]}>
                <SafeAreaView style={styles.settingsContainer}>
                    {!eventID && <EventForm onSuccess={setEventID} />}
                    {eventID && (
                        <>
                            <VerticalSpacer height={40} />
                            <PageTitle title={i18n.t('tabs.create_event')} />
                            <VerticalSpacer height={14} />
                            <Text style={styles.successTitle}>
                                {i18n.t('create_event.success_title')}
                            </Text>
                            <Text style={styles.successText}>
                                {i18n.t('create_event.success')}
                            </Text>
                            <VerticalSpacer height={20} />
                            <Button
                                text={i18n.t('events.share')}
                                icon="Share"
                                disabled={false}
                                onPress={() =>
                                    Share.share({
                                        message:
                                            'aghmap://map?eventID=' + eventID,
                                    })
                                }
                            />
                        </>
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
    descriptionInput: {
        height: 100,
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
    row: { flexDirection: 'row' },
});
