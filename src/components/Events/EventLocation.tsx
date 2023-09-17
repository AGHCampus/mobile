import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../lib/Colors';
import { Constants } from '../../lib/Constants';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { TabNavigation } from '../../screens/navigationTypes';
import { LatLng } from 'react-native-maps';
import TextButton from '../TextButton';
import i18n from '../../utils/i18n';

interface Props {
    name: string;
    logoUrl?: string;
    coordinate?: LatLng;
}

export default function EventButtonRow({ logoUrl, name, coordinate }: Props) {
    const navigation = useNavigation<TabNavigation>();

    return (
        <View style={styles.container}>
            {logoUrl && (
                <FastImage
                    source={{ uri: logoUrl }}
                    style={styles.locationLogo}
                />
            )}
            <Text>{name}</Text>
            {coordinate && (
                <>
                    <Text> - </Text>
                    <TextButton
                        color={Colors.accentGreen}
                        label={i18n.t('events.show_on_map')}
                        onPress={() =>
                            navigation.navigate('Map', {
                                eventLocation: coordinate,
                            })
                        }
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Constants.SPACING_UNIT_24,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationLogo: {
        width: 20,
        height: 20,
        borderRadius: 12,
        marginHorizontal: 4,
    },
});
