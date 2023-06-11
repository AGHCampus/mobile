import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import TopSpacer from './TopSpacer';
import Icon from '../components/Icon';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';

interface Props {
    onCollapsePress: () => void;
}

const BottomSheetFullScreenHeader = ({ onCollapsePress }: Props) => {
    return (
        <View style={styles.container}>
            <TopSpacer />
            <View style={styles.parentRow}>
                <View style={styles.leftRow}>
                    <TouchableOpacity onPress={onCollapsePress}>
                        <View style={styles.iconContainer}>
                            <Icon
                                asset={'AngleDown'}
                                color={Colors.black}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightRow}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.iconContainer}>
                            <Icon
                                asset={'Search'}
                                color={Colors.black}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.iconContainer}>
                            <Icon
                                asset={'MenuDots'}
                                color={Colors.black}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default BottomSheetFullScreenHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Constants.SPACING_UNIT_8,
    },
    parentRow: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
    },
    leftRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Constants.TAP_UNIT_48,
        height: Constants.TAP_UNIT_48,
    },
    icon: {
        width: 18,
        height: 18,
    },
});
