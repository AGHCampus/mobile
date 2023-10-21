import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';

import { VerticalSpacer } from '../components/Spacers';
import ColumnEventTile from '../components/Events/ColumnEventTile';
import { Constants } from '../lib/Constants';
import { EventData, TEMP_OFFER_DATA } from '../lib/MockedData';

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_20} />;
}

function ListFooter() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

export default function OffersScreen() {
    // TODO: Fetch offer data from server
    const offerData: ReadonlyArray<EventData> = TEMP_OFFER_DATA;
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <FlatList
                data={offerData}
                renderItem={event => (
                    <ColumnEventTile
                        event={event.item}
                        showLocation={true}
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
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
