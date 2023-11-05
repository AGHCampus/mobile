import React, { RefObject } from 'react';
import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Shadows } from '../lib/Shadows';
import Icon from './Icon';
import { Colors } from '../lib/Colors';
import { Constants } from '../lib/Constants';

interface Props {
    inputRef: RefObject<TextInput>;
    onPress: () => void;
}

export default function SearchBar({ inputRef, onPress }: Props) {
    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={[styles.menuIcon, Shadows.depth2]}>
                <Icon asset="MenuDots" color={Colors.black} />
            </TouchableOpacity>
            <View style={[styles.searchBar, Shadows.depth2]}>
                <TextInput
                    ref={inputRef}
                    placeholder="Search..."
                    style={styles.searchBarInput}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 48,
        flexDirection: 'row',
    },
    menuIcon: {
        width: Constants.MARGIN_UNIT_24 + Constants.SPACING_UNIT_16,
        marginLeft: Constants.MARGIN_UNIT_24,
        justifyContent: 'center',
        alignItems: 'center',
        height: Constants.MARGIN_UNIT_24 + Constants.SPACING_UNIT_16,
        borderRadius: Constants.BORDER_UNIT_8,
        backgroundColor: 'white',
    },
    searchBar: {
        width:
            Dimensions.get('window').width -
            2 * Constants.TAP_UNIT_48 -
            Constants.SPACING_UNIT_8,
        backgroundColor: 'white',
        height: Constants.MARGIN_UNIT_24 + Constants.SPACING_UNIT_16,
        borderRadius: Constants.BORDER_RADIUS_MEDIUM,
        paddingHorizontal: Constants.BORDER_UNIT_8,
        marginRight: Constants.MARGIN_UNIT_24,
        marginLeft: Constants.SPACING_UNIT_16,
        justifyContent: 'center',
    },
    searchBarInput: {
        lineHeight: 20,
        fontSize: 16,
    },
});
