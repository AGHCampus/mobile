import React, { useCallback, useContext } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import ColumnEventTile from '../components/Events/ColumnEventTile';
import { Constants } from '../lib/Constants';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';
import { LocationsDataContext } from '../../App';
import useOffersData from '../hooks/useOffersData';

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_28} />;
}

function ListFooter() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

export default function OffersScreen() {
    const { offersData, offersDataStatus } = useOffersData();
    const locationsData = useContext(LocationsDataContext);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper status={offersDataStatus}>
                <FlatList
                    data={offersData}
                    renderItem={event => (
                        <ColumnEventTile
                            location={locationsData[event.item.location_id]}
                            event={event.item}
                            showEventButtonRow={false}
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
