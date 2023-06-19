import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeView from './SafeView';

import EventTile, { EventData } from '../components/EventTile';
import { Constants } from '../lib/Constants';

const TEMP_EVENTS_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        locationID: '1',
        name: 'Event 1',
        description: `Event 1 description  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio nisl, iaculis non tempor quis, efficitur egestas est. In tortor ligula, imperdiet sed lorem eget, euismod lacinia arcu. Phasellus lobortis enim fermentum, molestie dolor vitae, pellentesque arcu. Mauris ac tortor vel ex semper blandit. Suspendisse in finibus augue, sit amet suscipit purus. Curabitur euismod, odio vitae pretium posuere, orci ante tempor orci, ut fringilla nibh mi et erat. Integer porttitor purus a dui faucibus, et hendrerit neque vestibulum. Ut quis ex finibus lorem bibendum gravida. Donec eget congue risus, ultricies mattis lacus. Aliquam erat volutpat. In sit amet sollicitudin nisl.`,
        imageUrl: 'https://picsum.photos/500',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
    },
    {
        id: '2',
        locationID: '2',
        name: 'Event 2',
        description: 'Event 2 description',
        imageUrl: 'https://picsum.photos/1280',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        endTime: new Date('2023-06-22T22:00:00+02:00'),
    },
    {
        id: '3',
        locationID: '3',
        name: 'Event 3',
        description: 'Event 3 description',
        imageUrl: 'https://picsum.photos/2137',
        startTime: new Date('2023-06-27T21:30:00+02:00'),
    },
] as const;

function ListSpacer() {
    return <View style={styles.listSpacer} />;
}
export default function EventsScreen() {
    // TODO: Fetch events data from server
    const eventsData: ReadonlyArray<EventData> = TEMP_EVENTS_DATA;

    return (
        <SafeView style={styles.container}>
            <FlatList
                data={eventsData}
                renderItem={event => <EventTile event={event.item} />}
                ItemSeparatorComponent={ListSpacer}
                showsVerticalScrollIndicator={false}
            />
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Constants.SPACING_UNIT_24,
    },
    listSpacer: {
        height: 24,
    },
});
