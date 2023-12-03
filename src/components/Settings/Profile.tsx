import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProfileImage from '../../../assets/Profile.png';
import { Colors } from '../../lib/Colors';

interface Props {
    username: string;
    email: string;
}

export default function Profile({ username, email }: Props) {
    return (
        <View style={styles.profileRow}>
            <Image source={ProfileImage} style={styles.profileImage} />
            <View style={styles.profileText}>
                <Text style={styles.usernameText}>{username}</Text>
                <View style={styles.settingsIconRow}>
                    <Text style={styles.settingsIconText}>{email}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileText: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    usernameText: {
        lineHeight: 36,
        fontSize: 30,
        fontWeight: '500',
        color: Colors.accentGreen,
    },
    settingsIconText: {
        fontSize: 14,
        lineHeight: 20,
    },
    settingsIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 6,
    },
});
