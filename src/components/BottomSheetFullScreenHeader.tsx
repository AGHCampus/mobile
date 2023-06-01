import React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
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
                        <View>
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
                        <View>
                            <Icon
                                asset={'Search'}
                                color={Colors.black}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <View>
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
        paddingHorizontal: Constants.SPACING_UNIT_16,
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
        gap: Constants.SPACING_UNIT_16,
    },
    rightRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: Constants.SPACING_UNIT_16,
    },
    button: {
        flex: 1,
    },
    icon: {
        width: 18,
        height: 18,
    },
});
