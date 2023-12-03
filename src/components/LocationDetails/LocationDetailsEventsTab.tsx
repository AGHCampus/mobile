import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { EventData } from '../../api/events';
import { Constants } from '../../lib/Constants';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';
import i18n from '../../utils/i18n';

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
                emptyListText={i18n.t('location.empty_events')}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsEventsTab;
