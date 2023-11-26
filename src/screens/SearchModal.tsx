import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    ScrollView,
    Text,
    Image,
    Platform,
    TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fuse from 'fuse.js';
import { Colors } from '../lib/Colors';
import { Shadows } from '../lib/Shadows';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigation } from '../lib/Navigation';
import { Constants } from '../lib/Constants';
import { getMarkerImageByCategory } from '../components/Markers';
import IconButton from '../components/IconButton';
import i18n from '../utils/i18n';
import { LocationsDataContext } from '../../App';

const FUSE_SEARCH_OPTIONS = {
    threshold: 0.4,
    keys: ['name'],
};

export default function SearchModal() {
    const locationsData = useContext(LocationsDataContext);
    const inputRef = useRef<TextInput>(null);
    const tabNavigation = useNavigation<TabNavigation>();
    const navigation = useNavigation<StackNavigation>();

    const [searchText, setSearchText] = useState('');

    const locations = Object.values(locationsData).filter(
        location => location.name !== 'global',
    );

    const fuse = new Fuse(locations, FUSE_SEARCH_OPTIONS);
    const locationsFiltered = fuse.search(searchText).map(e => e.item);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={[styles.searchBar, Shadows.depth2]}>
                    <IconButton
                        asset={'ArrowLeft'}
                        color={Colors.accentGreen}
                        style={styles.goBackIconContainer}
                        iconStyle={styles.goBackIcon}
                        onPress={navigation.goBack}
                    />
                    <TextInput
                        ref={inputRef}
                        placeholder={i18n.t('search.placeholder')}
                        placeholderTextColor={Colors.gray}
                        autoCapitalize="none"
                        style={styles.searchBarInput}
                        onChangeText={setSearchText}
                    />
                </View>
                <View style={styles.scrollView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        {locationsFiltered.map((location, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.locationRow]}
                                onPress={() =>
                                    tabNavigation.navigate('Map', {
                                        eventLocation: location.coordinate,
                                    })
                                }>
                                <View style={styles.iconContainer}>
                                    {location.logoUrl ? (
                                        <FastImage
                                            source={{
                                                uri: location.logoUrl,
                                            }}
                                            style={styles.locationLogo}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.locationCategoryLogo}
                                            source={getMarkerImageByCategory(
                                                location.category,
                                            )}
                                        />
                                    )}
                                </View>
                                <View
                                    style={[
                                        styles.locationColumn,
                                        index !== 0 &&
                                            styles.locationColumnBorder,
                                    ]}>
                                    <Text style={styles.locationName}>
                                        {location.name}
                                    </Text>
                                    <Text style={styles.locationAddress}>
                                        ul. Testowa 21/15
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.bgWhite,
    },
    goBackIconContainer: {
        position: 'absolute',
        width: Constants.TAP_UNIT_MAP_ICONS,
        height: Constants.TAP_UNIT_MAP_ICONS,
        marginLeft: 1,
    },
    goBackIcon: {
        width: 26,
        height: 26,
    },
    searchBar: {
        width: Dimensions.get('window').width - 2 * Constants.SPACING_UNIT_10,
        height: Constants.TAP_UNIT_MAP_ICONS,
        margin: Constants.SPACING_UNIT_10,
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        backgroundColor: Colors.bgWhite,
    },
    searchBarInput: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.black,
        marginLeft: Constants.TAP_UNIT_MAP_ICONS - 4,
        marginRight: 20,
        marginTop: Platform.OS === 'ios' ? 15 : 2,
    },
    scrollView: {
        marginTop: 2,
        borderTopWidth: 0.5,
        borderColor: Colors.bgIcon,
        paddingHorizontal: Constants.SPACING_UNIT_10,
    },
    locationRow: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'row',
    },
    locationColumn: {
        flex: 1,
        paddingTop: 15,
        flexDirection: 'column',
    },
    locationColumnBorder: {
        borderTopWidth: 1,
        borderColor: Colors.bgDivider,
    },
    iconContainer: {
        marginVertical: Constants.SPACING_UNIT_16,
        marginRight: Constants.SPACING_UNIT_10,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.bgDivider,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationLogo: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    locationCategoryLogo: {
        width: 18,
        height: 18,
    },
    locationName: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.black,
    },
    locationAddress: {
        fontWeight: '400',
        fontSize: 15,
        color: Colors.textLightGray,
    },
});
