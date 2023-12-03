import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import TopSpacer from '../TopSpacer';
import IconButton from '../IconButton';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';

interface Props {
    onCollapseButtonPress: (event: GestureResponderEvent) => void;
    onSearchButtonPress: (event: GestureResponderEvent) => void;
    onMenuButtonPress: (event: GestureResponderEvent) => void;
}

const BottomSheetFullScreenHeader = ({
    onCollapseButtonPress,
    onSearchButtonPress,
    onMenuButtonPress,
}: Props) => {
    return (
        <View style={styles.container}>
            <TopSpacer />
            <View style={styles.parentRow}>
                <View style={styles.leftRow}>
                    <IconButton
                        asset={'AngleDown'}
                        color={Colors.black}
                        onPress={onCollapseButtonPress}
                    />
                </View>
                <View style={styles.rightRow}>
                    <IconButton
                        asset={'Search'}
                        color={Colors.black}
                        onPress={onSearchButtonPress}
                    />
                    <IconButton
                        asset={'MenuBurger'}
                        color={Colors.black}
                        onPress={onMenuButtonPress}
                    />
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
});
