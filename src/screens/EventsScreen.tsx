import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import SafeView from './SafeView';

import ExpandableEventTile, {
    EventData,
} from '../components/Events/ExpandableEventTile';
import { VerticalSpacer } from '../components/Spacers';
import { Constants } from '../lib/Constants';

export const TEMP_EVENTS_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        name: 'Event 1',
        description: `Event 1 description  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio nisl, iaculis non tempor quis, efficitur egestas est. In tortor ligula, imperdiet sed lorem eget, euismod lacinia arcu. Phasellus lobortis enim fermentum, molestie dolor vitae, pellentesque arcu. Mauris ac tortor vel ex semper blandit. Suspendisse in finibus augue, sit amet suscipit purus. Curabitur euismod, odio vitae pretium posuere, orci ante tempor orci, ut fringilla nibh mi et erat. Integer porttitor purus a dui faucibus, et hendrerit neque vestibulum. Ut quis ex finibus lorem bibendum gravida. Donec eget congue risus, ultricies mattis lacus. Aliquam erat volutpat. In sit amet sollicitudin nisl. `,
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

    {
        id: '4',
        name: 'Event 4',
        description: 'Event 4 description',
        imageUrl: 'https://picsum.photos/847',
        startTime: new Date('2023-06-29T11:30:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'SWFiS AGH',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },

    {
        id: '5',
        name: 'Event 5',
        description: 'Event 5 description',
        imageUrl: 'https://picsum.photos/1632',
        startTime: new Date('2023-07-04T16:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'Wydział Matematyki Stosowanej',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },
] as const;

function ListSpacer() {
    return <VerticalSpacer height={Constants.SPACING_UNIT_24} />;
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
                renderItem={event => <ExpandableEventTile event={event.item} />}
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
