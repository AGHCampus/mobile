import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import i18n from '../../utils/i18n';
import { Colors } from '../../lib/Colors';
import SettingRow from './SettingRow';
import { openURL } from '../../utils/linking';
import { VerticalSpacer } from '../Spacers';

export default function LearnMoreLinks() {
    return (
        <View>
            <Text style={styles.sectionTitle}>{i18n.t('settings.links')}</Text>
            <VerticalSpacer height={6} />
            <SettingRow
                iconAsset={'Website'}
                text={'Strona AGH'}
                onPress={() => openURL('https://www.agh.edu.pl/')}
            />
            <View style={styles.divider} />
            <SettingRow
                iconAsset={'Facebook'}
                text={'Facebook'}
                onPress={() => openURL('https://www.facebook.com/AGH.Krakow/')}
            />
            <View style={styles.divider} />
            <SettingRow
                iconAsset={'Instagram'}
                text={'Instagram'}
                onPress={() => openURL('https://www.instagram.com/agh.krakow/')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 20,
        lineHeight: 24,
        color: Colors.accentGreen,
        textAlign: 'center',
    },
    divider: {
        backgroundColor: Colors.bgDivider,
        width: '100%',
        height: 1,
    },
});
