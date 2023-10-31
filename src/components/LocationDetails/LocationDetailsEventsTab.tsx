import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';

interface Props {
    eventsData: ReadonlyArray<EventData>;
    eventsDataStatus: DataFetchingStatus;
}

const LocationDetailsEventsTab = ({ eventsData, eventsDataStatus }: Props) => {
    return (
        <DataFetchStatusWrapper status={eventsDataStatus}>
            <LocationDetailsEventsList
                eventsData={eventsData}
                showEventButtonRow={true}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsEventsTab;
