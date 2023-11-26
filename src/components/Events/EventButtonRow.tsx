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
import i18n from '../../utils/i18n';

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
                        label={i18n.t('events.more_info')}
                        style={styles.infoButton}
                    />
                    <HorizontalSpacer width={Constants.SPACING_UNIT_10} />
                </>
            )}
            <AccentButton.Secondary
                onPress={() => Share.share(shareContent)}
                icon={'Share'}
                color={Colors.accentGreen}
                label={i18n.t('events.share')}
                style={url ? styles.shareButton : styles.singleButton}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    infoButton: {
        flexGrow: 3,
        height: 36,
    },
    shareButton: {
        height: 36,
        flexGrow: 2,
    },
    singleButton: {
        height: 36,
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
