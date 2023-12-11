import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import InfoTile from '../components/Info/InfoTile';
import useInfoData from '../hooks/useInfoData';
import DataFetchStatusWrapper from '../components/DataFetchStatusWrapper';
import useRefreshControl from '../hooks/useRefreshControl';

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_16} />;
}

export default function InfoScreen() {
    const { infoData, infoDataStatus, refresh } = useInfoData();
    const { onRefresh, refreshing } = useRefreshControl(
        infoDataStatus,
        refresh,
    );

    return (
        <SafeView style={styles.container}>
            <DataFetchStatusWrapper
                status={infoDataStatus}
                padding={Constants.SPACING_UNIT_10}
                refresh={refresh}>
                <FlatList
                    data={infoData}
                    renderItem={info => (
                        <InfoTile
                            title={info.item.title}
                            content={info.item.content}
                            timestamp={info.item.timestamp}
                        />
                    )}
                    ListHeaderComponent={ListSpacer}
                    ItemSeparatorComponent={ListSpacer}
                    ListFooterComponent={ListSpacer}
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
