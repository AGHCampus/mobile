import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import ColumnEventTile from '../Events/ColumnEventTile';
import { TEMP_EVENTS_DATA } from '../../screens/EventsScreen';
import { VerticalSpacer } from '../Spacers';
import { EventData } from '../Events/ExpandableEventTile';

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
const LocationDetailsEventsTab = ({
    selectedLocationID,
    isBottomSheetFullscreen,
}: Props) => {
    const eventsData: ReadonlyArray<EventData> = TEMP_EVENTS_DATA;
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <View
            style={[
                styles.container,
                isBottomSheetFullscreen
                    ? styles.fullscreenList
                    : styles.smallList,
            ]}>
            <FlatList
                data={
                    parseInt(selectedLocationID) % 2 === 0
                        ? eventsData.slice(0, 2)
                        : eventsData.slice(2, 4)
                }
                scrollEnabled
                renderItem={event => <ColumnEventTile event={event.item} />}
                ItemSeparatorComponent={ListSpacer}
                ListFooterComponent={ListFooter}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default LocationDetailsEventsTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgLightGray,
        marginTop: Constants.SPACING_UNIT_16,
    },
    fullscreenList: {
        height: '100%',
    },
    smallList: {
        height: 300,
    },
});
