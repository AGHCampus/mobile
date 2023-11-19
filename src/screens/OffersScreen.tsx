import React, { useContext } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import ColumnEventTile from '../components/Events/ColumnEventTile';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';
import { LocationsDataContext } from '../../App';
import useOffersData from '../hooks/useOffersData';
import useRefreshControl from '../hooks/useRefreshControl';

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
    const { offersData, offersDataStatus, refresh } = useOffersData();
    const locationsData = useContext(LocationsDataContext);
    const { onRefresh, refreshing } = useRefreshControl(
        offersDataStatus,
        refresh,
    );

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper
                status={offersDataStatus}
                padding={Constants.SPACING_UNIT_10}>
                <FlatList
                    data={offersData}
                    renderItem={event => (
                        <ColumnEventTile
                            location={locationsData[event.item.locationId]}
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
        backgroundColor: Colors.bgLightGray,
    },
});
