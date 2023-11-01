import React, { useCallback, useContext } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import ExpandableEventTile from '../components/Events/ExpandableEventTile';
import { Constants } from '../lib/Constants';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';
import { LocationsDataContext } from '../../App';
import useEventsData from '../hooks/useEventsData';

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_28} />;
}

function ListFooter() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

export default function EventsScreen() {
    const { eventsData, eventsDataStatus } = useEventsData();
    const locationsData = useContext(LocationsDataContext);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper status={eventsDataStatus}>
                <FlatList
                    data={eventsData}
                    renderItem={event => (
                        <ExpandableEventTile
                            location={locationsData[event.item.location_id]}
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
    },
});
