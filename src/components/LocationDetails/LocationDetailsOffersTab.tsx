import React from 'react';
import LocationDetailsEventsList from './LocationDetailsEventsList';
import { DataFetchingStatus } from '../../lib/CommonTypes';
import { Constants } from '../../lib/Constants';
import { EventData } from '../../api/events';
import { LocationData } from '../../api/locations';
import DataFetchStatusWrapper from '../DataFetchStatusWrapper';
import i18n from '../../utils/i18n';

interface Props {
    offersData: ReadonlyArray<EventData>;
    locationData: LocationData;
    offersDataStatus: DataFetchingStatus;
    refresh: () => void;
}

const LocationDetailsOffersTab = ({
    offersData,
    locationData,
    offersDataStatus,
    refresh,
}: Props) => {
    return (
        <DataFetchStatusWrapper
            status={offersDataStatus}
            padding={Constants.SPACING_UNIT_10}>
            <LocationDetailsEventsList
                eventsData={offersData}
                locationData={locationData}
                showEventButtonRow={false}
                shareOnLongPress={true}
                refresh={refresh}
                dataStatus={offersDataStatus}
                emptyListText={i18n.t('location.empty_offers')}
            />
        </DataFetchStatusWrapper>
    );
};

export default LocationDetailsOffersTab;
