import React from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Text } from 'react-native';
import ColumnEventTile from '../Events/ColumnEventTile';
import { VerticalSpacer } from '../Spacers';
import { Constants } from '../../lib/Constants';
import { Colors } from '../../lib/Colors';
import { EventData } from '../../api/events';
import { LocationData } from '../../api/locations';
import useRefreshControl from '../../hooks/useRefreshControl';
import { DataFetchingStatus } from '../../lib/CommonTypes';

function ListHeader() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_10} />;
}

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_24} />;
}

function ListFooter() {
    return <VerticalSpacer height={44} />;
}

interface Props {
    eventsData: ReadonlyArray<EventData>;
    locationData: LocationData;
    showEventButtonRow: boolean;
    shareOnLongPress: boolean;
    dataStatus: DataFetchingStatus;
    emptyListText: string;
    refresh: () => void;
}

const LocationDetailsEventsList = ({
    eventsData,
    locationData,
    showEventButtonRow,
    shareOnLongPress,
    dataStatus,
    emptyListText,
    refresh,
}: Props) => {
    const { onRefresh, refreshing } = useRefreshControl(dataStatus, refresh);

    return (
        <View style={styles.container}>
            <FlatList
                data={eventsData}
                scrollEnabled
                renderItem={event => (
                    <ColumnEventTile
                        location={locationData}
                        event={event.item}
                        showLocationLink={false}
                        showEventButtonRow={showEventButtonRow}
                        shareOnLongPress={shareOnLongPress}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.textEmptyContainer}>
                        <Text style={styles.emptyText}>{emptyListText}</Text>
                    </View>
                }
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
    textEmptyContainer: {
        flexDirection: 'column',
        paddingTop: Constants.SPACING_UNIT_16,
        paddingHorizontal: Constants.SPACING_UNIT_16,
    },
    emptyText: {
        fontWeight: '400',
        fontSize: 16,
        color: Colors.textLightGray,
        textAlign: 'center',
    },
});
