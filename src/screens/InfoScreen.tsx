import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';
import { VerticalSpacer } from '../components/Spacers';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';
import InfoTile from '../components/Info/InfoTile';

export interface InfoData {
    title: string;
    content: string;
    timestamp: Date;
}

const TEMP_INFO_DATA: ReadonlyArray<InfoData> = [
    {
        title: 'Godziny rektorskie',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl.',
        timestamp: new Date('2023-06-20T10:00:00+02:00'),
    },
    {
        title: 'Sesja egzaminacyjna',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl.',
        timestamp: new Date('2023-06-20T10:00:00+02:00'),
    },
    {
        title: 'Stypendium rektora',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies nisl nisl vitae nisl.',
        timestamp: new Date('2023-06-20T10:00:00+02:00'),
    },
];

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_20} />;
}

export default function InfoScreen() {
    // TODO: Fetch info data from server
    const infoData: ReadonlyArray<InfoData> = TEMP_INFO_DATA;

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
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
