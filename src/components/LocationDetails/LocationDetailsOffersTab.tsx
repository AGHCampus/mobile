import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';

interface Props {
    offersData: ReadonlyArray<EventData>;
    offersDataStatus: DataFetchingStatus;
}

const LocationDetailsOffersTab = ({ offersData, offersDataStatus }: Props) => {
    return (
        <DataFetchStatusWrapper status={offersDataStatus}>
            <LocationDetailsEventsList
                eventsData={offersData}
                showEventButtonRow={false}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsOffersTab;
