import React from 'react';
import {
    Share,
    ShareContent,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import AccentButton from '../AccentButton';
import { openURL } from '../../utils/linking';
import { Colors } from '../../lib/Colors';
import { HorizontalSpacer } from '../Spacers';
import { Constants } from '../../lib/Constants';
import Animated from 'react-native-reanimated';

interface Props {
    shareContent: ShareContent;
    url?: string;
    style?: StyleProp<ViewStyle>;
}

export default function EventButtonRow({ url, shareContent, style }: Props) {
    return (
        <Animated.View style={[styles.row, style]}>
            {url && (
                <>
                    <AccentButton.Primary
                        onPress={() => openURL(url)}
                        icon={'Info'}
                        color={Colors.accentGreen}
                        label={'More info'}
                        style={styles.infoButton}
                    />
                    <HorizontalSpacer width={Constants.SPACING_UNIT_16} />
                </>
            )}
            <AccentButton.Secondary
                onPress={() => Share.share(shareContent)}
                icon={'Share'}
                color={Colors.accentGreen}
                label={'Share'}
                style={url ? styles.shareButton : styles.singleButton}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    infoButton: {
        flexGrow: 5,
        height: 32,
    },
    shareButton: {
        height: 32,
        flexGrow: 4,
    },
    singleButton: {
        height: 32,
        marginHorizontal: 24,
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
});