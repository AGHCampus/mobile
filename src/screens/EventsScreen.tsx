import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';

import { VerticalSpacer } from '../components/Spacers';
import ExpandableEventTile from '../components/Events/ExpandableEventTile';
import { Constants } from '../lib/Constants';
import {
    EventData,
    LocationsMap,
    TEMP_EVENTS_DATA,
    TEMP_LOCATIONS_DATA,
} from '../lib/MockedData';

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_20} />;
}

function ListFooter() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

export default function EventsScreen() {
    // TODO: Fetch events data from server
    const eventsData: ReadonlyArray<EventData> = TEMP_EVENTS_DATA;
    const locationsData: LocationsMap = TEMP_LOCATIONS_DATA;

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <FlatList
                data={eventsData}
                renderItem={event => (
                    <ExpandableEventTile
                        location={locationsData[event.item.locationId]}
                        event={event.item}
                    />
                )}
                ListHeaderComponent={ListHeader}
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
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
