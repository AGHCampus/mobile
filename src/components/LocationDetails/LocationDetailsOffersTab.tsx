import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';

interface Props {
    offersData: ReadonlyArray<EventData>;
    offersDataStatus: DataFetchingStatus;
    refresh: () => void;
}

const LocationDetailsOffersTab = ({
    offersData,
    offersDataStatus,
    refresh,
}: Props) => {
    return (
        <DataFetchStatusWrapper status={offersDataStatus}>
            <LocationDetailsEventsList
                eventsData={offersData}
                showEventButtonRow={false}
                refresh={refresh}
                dataStatus={offersDataStatus}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsOffersTab;
