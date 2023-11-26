import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Platform,
} from 'react-native';
import { Shadows } from '../lib/Shadows';
import Icon from './Icon';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';
import i18n from '../utils/i18n';

interface Props {
    onMenuPress: () => void;
    onSearchPress: () => void;
}

export default function SearchBar({ onMenuPress, onSearchPress }: Props) {
    return (
        <SafeAreaView style={styles.safeView}>
            <TouchableOpacity
                activeOpacity={Constants.TOUCHABLE_OPACITY_ACTIVE_OPACITY_SOFT}
                onPress={onMenuPress}
                style={[styles.menuIcon, Shadows.depth2]}>
                <Icon
                    asset="MenuBurger"
                    color={Colors.black}
                    style={styles.burgerIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onSearchPress}
                style={[styles.searchBar, Shadows.depth2]}>
                <View>
                    <View style={styles.markerIconContainer}>
                        <Icon
                            asset="Marker"
                            color={Colors.accentGreen}
                            style={styles.markerIcon}
                        />
                    </View>
                    <Text style={styles.searchBarText}>
                        {i18n.t('search.placeholder')}
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
    },
    menuIcon: {
        width: Constants.TAP_UNIT_MAP_ICONS,
        height: Constants.TAP_UNIT_MAP_ICONS,
        marginTop: Constants.SPACING_UNIT_10,
        marginLeft: Constants.SPACING_UNIT_10,
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bgWhite,
    },
    burgerIcon: {
        width: 20,
        height: 20,
    },
    markerIconContainer: {
        position: 'absolute',
        width: Constants.TAP_UNIT_MAP_ICONS,
        height: Constants.TAP_UNIT_MAP_ICONS,
        marginLeft: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerIcon: {
        marginTop: 1,
        width: 20,
        height: 20,
    },
    searchBar: {
        width:
            Dimensions.get('window').width -
            Constants.TAP_UNIT_MAP_ICONS -
            2 * Constants.SPACING_UNIT_10 -
            Constants.SPACING_UNIT_8,
        height: Constants.TAP_UNIT_MAP_ICONS,
        marginTop: Constants.SPACING_UNIT_10,
        marginLeft: Constants.SPACING_UNIT_8,
        borderRadius: Constants.BORDER_RADIUS_LARGE,
        backgroundColor: Colors.bgWhite,
    },
    searchBarText: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.gray,
        marginLeft: Constants.TAP_UNIT_MAP_ICONS - 4,
        marginRight: 14,
        marginTop: Platform.OS === 'ios' ? 15 : 13,
    },
});
