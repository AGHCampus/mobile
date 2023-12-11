import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import { LocationData } from '../../api/locations';
import { Constants } from '../../lib/Constants';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';
import i18n from '../../utils/i18n';

interface Props {
    eventsData: ReadonlyArray<EventData>;
    locationData: LocationData;
    eventsDataStatus: DataFetchingStatus;
    refresh: () => void;
}

const LocationDetailsEventsTab = ({
    eventsData,
    locationData,
    eventsDataStatus,
    refresh,
}: Props) => {
    return (
        <DataFetchStatusWrapper
            status={eventsDataStatus}
            padding={Constants.SPACING_UNIT_10}>
            <LocationDetailsEventsList
                eventsData={eventsData}
                locationData={locationData}
                showEventButtonRow={true}
                shareOnLongPress={false}
                refresh={refresh}
                dataStatus={eventsDataStatus}
                emptyListText={i18n.t('location.empty_events')}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsEventsTab;
