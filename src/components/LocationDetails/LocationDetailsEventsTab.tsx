import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import { Constants } from '../../lib/Constants';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';

interface Props {
    eventsData: ReadonlyArray<EventData>;
    eventsDataStatus: DataFetchingStatus;
    refresh: () => void;
}

const LocationDetailsEventsTab = ({
    eventsData,
    eventsDataStatus,
    refresh,
}: Props) => {
    return (
        <DataFetchStatusWrapper
            status={eventsDataStatus}
            padding={Constants.SPACING_UNIT_10}>
            <LocationDetailsEventsList
                eventsData={eventsData}
                showEventButtonRow={true}
                refresh={refresh}
                dataStatus={eventsDataStatus}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsEventsTab;
