import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import SafeView from './SafeView';

import EventTile, { EventData } from '../components/EventTile';

const TEMP_EVENTS_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        name: 'Event 1',
        description: `Event 1 description  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio nisl, iaculis non tempor quis, efficitur egestas est. In tortor ligula, imperdiet sed lorem eget, euismod lacinia arcu. Phasellus lobortis enim fermentum, molestie dolor vitae, pellentesque arcu. Mauris ac tortor vel ex semper blandit. Suspendisse in finibus augue, sit amet suscipit purus. Curabitur euismod, odio vitae pretium posuere, orci ante tempor orci, ut fringilla nibh mi et erat. Integer porttitor purus a dui faucibus, et hendrerit neque vestibulum. Ut quis ex finibus lorem bibendum gravida. Donec eget congue risus, ultricies mattis lacus. Aliquam erat volutpat. In sit amet sollicitudin nisl.`,
        imageUrl: 'https://picsum.photos/500',
        websiteUrl: 'https://www.google.com',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06805101572392,
            longitude: 19.90836342605491,
        },
        locationName: 'Klub Studio',
        locationLogoUrl:
            'https://www.szarpidrut.pl/website_assets/files/2018/04/photos/studio-logo.png',
    },
    {
        id: '2',
        name: 'Event 2',
        description: 'Event 2 description',
        imageUrl: 'https://picsum.photos/1280',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        endTime: new Date('2023-06-22T22:00:00+02:00'),
        websiteUrl: 'https://www.google.com',
        locationName: 'Akademia Górniczo-Hutnicza',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },
    {
        id: '3',
        name: 'Event 3',
        description: 'Event 3 description',
        imageUrl: 'https://picsum.photos/2137',
        startTime: new Date('2023-06-27T21:30:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'Instytut Informatyki',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },
] as const;

function ListSpacer() {
    return <View style={styles.listSpacer} />;
}
export default function EventsScreen() {
    // TODO: Fetch events data from server
    const eventsData: ReadonlyArray<EventData> = TEMP_EVENTS_DATA;
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    return (
        <SafeView style={styles.container}>
            <FlatList
                data={eventsData}
                renderItem={event => <EventTile event={event.item} />}
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
    listSpacer: {
        height: 24,
    },
});
