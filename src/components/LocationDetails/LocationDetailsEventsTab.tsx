import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { EventData, TEMP_EVENTS_DATA } from '../../lib/MockedData';

interface Props {
    selectedLocationID: string;
}

// TODO: Fetch data from backend
const LocationDetailsEventsTab = ({ selectedLocationID }: Props) => {
    const eventsData: ReadonlyArray<EventData> = TEMP_EVENTS_DATA;

    console.log('selectedLocationID', selectedLocationID);

    return (
        <LocationDetailsEventsList
            eventsData={eventsData}
            showEventButtonRow={true}
        />
    );
};

export default LocationDetailsEventsTab;
