import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProfileImage from '../../../assets/Profile.png';
import { VerticalSpacer } from '../Spacers';
import Icon from '../Icon';
import i18n from '../../utils/i18n';
import { Colors } from '../../lib/Colors';

interface Props {
    username: string;
}

export default function Profile({ username }: Props) {
    return (
        <View style={styles.profileRow}>
            <Image source={ProfileImage} style={styles.profileImage} />
            <View style={styles.profileText}>
                <Text style={styles.usernameText}>{username}</Text>
                <VerticalSpacer height={4} />
                <View style={styles.settingsIconRow}>
                    <Icon
                        asset={'Sliders'}
                        color={Colors.black}
                        style={styles.settingsIcon}
                    />
                    <Text style={styles.settingsIconText}>
                        {i18n.t('tabs.settings')}
                    </Text>
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
        lineHeight: 41,
        fontSize: 34,
        fontWeight: '500',
        color: Colors.accentGreen,
    },
    settingsIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    settingsIconText: {
        fontSize: 17,
        lineHeight: 20,
    },
    settingsIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
