import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';

import ExpandableEventTile, {
    EventData,
} from '../components/Events/ExpandableEventTile';
import { VerticalSpacer } from '../components/Spacers';
import { Constants } from '../lib/Constants';

export const TEMP_OFFER_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        name: 'Dzień Studenta w Good Lood',
        description:
            '20% zniżki na lody w Good Lood po okazaniu legitymacji studenckiej.',
        imageUrl:
            'https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg',
        websiteUrl: 'https://www.google.com',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06872094498266,
            longitude: 19.90529235466219,
        },
        locationName: 'Good Lood',
        locationLogoUrl:
            'https://scontent-waw1-1.xx.fbcdn.net/v/t39.30808-6/347248821_573873638274193_3401697977579833877_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Em3YIW_gYvwAX-iRHON&_nc_ht=scontent-waw1-1.xx&oh=00_AfCCFDbpj9Ckoo7m2g6KDoAoGB298S72ZJz4L4wEecInFw&oe=65315A7D',
    },
    {
        id: '2',
        name: 'Studenckie rollo',
        description:
            'Duże rollo w cenie małego po okazaniu legitymacji studenckiej.',
        imageUrl:
            'https://restaumatic-production.imgix.net/uploads/accounts/34896/media_library/58026fe4-3591-4d08-9788-e3bc8bae94d2.jpg',
        startTime: new Date('2023-10-01T10:00:00+02:00'),
        endTime: new Date('2024-07-01T00:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06827159372157,
            longitude: 19.91452734081454,
        },
        locationName: 'Kebab Ali Baba',
    },
    {
        id: '3',
        name: 'Tańsze ksero i druk',
        description:
            'Tylko dla studentów, 10% zniżki na ksero i druk po okazaniu legitymacji studenckiej.',
        imageUrl: 'https://neograf24.pl/_files/img/offer/kserografia/ksero.jpg',
        startTime: new Date('2023-10-01T10:00:00+02:00'),
        endTime: new Date('2024-07-01T00:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.068268964913656,
            longitude: 19.909066544600243,
        },
        locationName: 'Ksero Kapitol',
    },
] as const;

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_24} />;
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
                    <ExpandableEventTile event={event.item} collapsed={false} />
                )}
                ItemSeparatorComponent={ListSpacer}
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
