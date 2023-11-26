import React, { useContext } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import ExpandableEventTile from '../components/Events/ExpandableEventTile';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';
import { LocationsDataContext } from '../../App';
import useEventsData from '../hooks/useEventsData';
import useRefreshControl from '../hooks/useRefreshControl';

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
    const { eventsData, eventsDataStatus, refresh } = useEventsData();
    const locationsData = useContext(LocationsDataContext);
    const { onRefresh, refreshing } = useRefreshControl(
        eventsDataStatus,
        refresh,
    );

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper
                status={eventsDataStatus}
                padding={Constants.SPACING_UNIT_10}
                refresh={refresh}>
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
            </DataFetchStatusWrapper>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLightGray,
    },
});
