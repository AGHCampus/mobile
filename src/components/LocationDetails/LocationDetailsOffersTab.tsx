import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { EventData, TEMP_OFFER_DATA } from '../../lib/MockedData';

interface Props {
    selectedLocationID: string;
}

// TODO: Fetch data from backend
const LocationDetailsOffersTab = ({ selectedLocationID }: Props) => {
    const eventsData: ReadonlyArray<EventData> = TEMP_OFFER_DATA;

    console.log('selectedLocationID', selectedLocationID);

    return (
        <LocationDetailsEventsList
            eventsData={eventsData}
            showEventButtonRow={false}
        />
    );
};

export default LocationDetailsOffersTab;
