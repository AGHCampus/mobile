import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../lib/Colors';
import IconButton from '../IconButton';
import { HorizontalSpacer } from '../Spacers';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../lib/Navigation';

interface Props {
    title: string;
}

export default function PageTitle({ title }: Props) {
    const navigation = useNavigation<StackNavigation>();

    return (
        <View style={styles.titleRow}>
            <HorizontalSpacer width={32} />
            <Text style={styles.titleText}>{title}</Text>
            <IconButton
                asset={'Back'}
                color={Colors.black}
                onPress={navigation.goBack}
                style={styles.backButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 20,
        lineHeight: 24,
        color: Colors.accentGreen,
        textAlign: 'center',
    },
    backButton: {
        height: 25,
        width: 30,
        alignItems: 'flex-end',
        paddingRight: 2,
    },
});
