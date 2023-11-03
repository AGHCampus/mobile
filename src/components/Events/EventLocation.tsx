import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { LatLng } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../TextButton';
import { TabNavigation } from '../../screens/navigationTypes';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import i18n from '../../utils/i18n';
import AghSmall from '../../../assets/Agh_small.png';

interface Props {
    name: string;
    logoUrl?: string;
    coordinate?: LatLng;
}

export default function EventLocation({ logoUrl, name, coordinate }: Props) {
    const navigation = useNavigation<TabNavigation>();

    return (
        <View style={styles.container}>
            {logoUrl ? (
                <FastImage
                    source={{ uri: logoUrl }}
                    style={styles.locationLogo}
                />
            ) : (
                <Image source={AghSmall} style={styles.locationLogo} />
            )}
            <View style={styles.row}>
                <Text style={styles.text}>
                    {name === 'global' ? i18n.t('agh') : name}
                </Text>
                {coordinate && name !== 'global' && (
                    <>
                        <Text style={styles.text}>-</Text>
                        <TextButton
                            color={Colors.textLink}
                            fontSize={13}
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
        marginBottom: 5,
    },

    row: {
        flexDirection: 'row',
        gap: Constants.SPACING_UNIT_8,
    },

    text: {
        fontSize: 13,
        color: Colors.black,
    },

    locationLogo: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 4,
    },
});
