import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { EventData } from '../../lib/MockedData';

interface Props {
    offersData: ReadonlyArray<EventData>;
}

// TODO: Fetch data from backend
const LocationDetailsOffersTab = ({ offersData }: Props) => {
    return (
        <LocationDetailsEventsList
            eventsData={offersData}
            showEventButtonRow={false}
        />
    );
};

export default LocationDetailsOffersTab;
