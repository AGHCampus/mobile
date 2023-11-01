import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import InfoTile from '../components/Info/InfoTile';
import useInfoData from '../hooks/useInfoData';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_20} />;
}

export default function InfoScreen() {
    // TODO: Fetch info data from server

    const [refreshing, setRefreshing] = useState(false);
    const { infoData, infoDataStatus } = useInfoData();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper status={infoDataStatus}>
                <FlatList
                    data={infoData}
                    renderItem={info => (
                        <InfoTile
                            title={info.item.title}
                            content={info.item.content}
                            timestamp={info.item.timestamp}
                        />
                    )}
                    ItemSeparatorComponent={ListSpacer}
                    ListHeaderComponent={ListSpacer}
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
        backgroundColor: Colors.bgWhite,
        paddingHorizontal: Constants.SPACING_UNIT_16,
    },
});
