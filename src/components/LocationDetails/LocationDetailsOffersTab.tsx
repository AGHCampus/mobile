import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import ColumnEventTile from '../Events/ColumnEventTile';
import { VerticalSpacer } from '../Spacers';
import { EventData } from '../Events/ExpandableEventTile';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { TEMP_OFFER_DATA } from '../../screens/OffersScreen';

interface Props {
    selectedLocationID: string;
    isBottomSheetFullscreen: boolean;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_24} />;
}
function ListFooter() {
    return <VerticalSpacer height={44} />;
}

// TODO: Fetch data from backend
const LocationDetailsOffersTab = ({
    selectedLocationID,
    isBottomSheetFullscreen,
}: Props) => {
    const eventsData: ReadonlyArray<EventData> = TEMP_OFFER_DATA;
    const [refreshing, setRefreshing] = useState(false);
    const animationState = useSharedValue(0);

    const listPadding = useAnimatedStyle(() => {
        return {
            paddingBottom: interpolate(animationState.value, [0, 1], [400, 0]),
        };
    }, [animationState.value]);

    const animateFullscreen = () => {
        animationState.value = withTiming(1, { duration: 200 });
    };

    useEffect(() => {
        if (isBottomSheetFullscreen) {
            animateFullscreen();
        } else {
            animationState.value = 0;
        }
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <Animated.View
            style={[styles.container, styles.fullscreenList, listPadding]}>
            <FlatList
                data={
                    parseInt(selectedLocationID) % 2 === 0
                        ? eventsData.slice(0, 2)
                        : eventsData.slice(0, 4)
                }
                scrollEnabled
                renderItem={event => <ColumnEventTile event={event.item} />}
                ItemSeparatorComponent={ListSpacer}
                ListFooterComponent={ListFooter}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </Animated.View>
    );
};

export default LocationDetailsOffersTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgLightGray,
        marginTop: Constants.SPACING_UNIT_16,
    },
    fullscreenList: {
        height: '100%',
    },
    smallList: {
        paddingBottom: 400,
    },
});
