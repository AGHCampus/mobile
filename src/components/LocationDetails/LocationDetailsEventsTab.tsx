import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { EventData } from '../../lib/MockedData';

interface Props {
    eventsData: ReadonlyArray<EventData>;
}

// TODO: Fetch data from backend
const LocationDetailsEventsTab = ({ eventsData }: Props) => {
    return (
        <LocationDetailsEventsList
            eventsData={eventsData}
            showEventButtonRow={true}
        />
    );
};

export default LocationDetailsEventsTab;
