import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, View } from 'react-native';
import ColumnEventTile from '../Events/ColumnEventTile';
import { VerticalSpacer } from '../Spacers';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { EventData } from '../../lib/MockedData';

interface Props {
    eventsData: ReadonlyArray<EventData>;
    showEventButtonRow: boolean;
}

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_20} />;
}

function ListFooter() {
    return <VerticalSpacer height={44} />;
}

const LocationDetailsEventsList = ({
    eventsData,
    showEventButtonRow,
}: Props) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={eventsData}
                scrollEnabled
                renderItem={event => (
                    <ColumnEventTile
                        event={event.item}
                        showEventButtonRow={showEventButtonRow}
                    />
                )}
                ListHeaderComponent={ListHeader}
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
        </View>
    );
};

export default LocationDetailsEventsList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgLightGray,
        height: '100%',
    },
});
