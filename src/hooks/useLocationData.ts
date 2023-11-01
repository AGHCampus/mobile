import { useContext, useEffect, useState } from 'react';
import { LocationDetailsData, fetchLocationDetails } from '../api/locations';
import {
    fetchLocationEvents,
    fetchLocationOffers,
    EventData,
} from '../api/events';
import { DataFetchingStatus } from '../lib/CommonTypes';
import { LocationsDataContext } from '../../App';

interface Props {
    selectedLocationID: string;
}

const useLocationData = ({ selectedLocationID }: Props) => {
    const locationsData = useContext(LocationsDataContext);

    const [locationDetailsData, setLocationDetailsData] =
        useState<LocationDetailsData>();
    const [locationDetailsDataStatus, setLocationDetailsDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );
    const [eventsData, setEventsData] = useState<ReadonlyArray<EventData>>([]);
    const [eventsDataStatus, setEventsDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    const [offersData, setOffersData] = useState<ReadonlyArray<EventData>>([]);
    const [offersDataStatus, setOffersDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    useEffect(() => {
        if (!selectedLocationID) {
            return;
        }

        fetchLocationDetails(selectedLocationID)
            .then(data => {
                if (data) {
                    setLocationDetailsData(data);
                    setLocationDetailsDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setLocationDetailsDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setLocationDetailsDataStatus(DataFetchingStatus.ERROR);
            });

        fetchLocationEvents(selectedLocationID)
            .then(data => {
                if (data) {
                    setEventsData(data);
                    setEventsDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setEventsDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setLocationDetailsDataStatus(DataFetchingStatus.ERROR);
            });

        fetchLocationOffers(selectedLocationID)
            .then(data => {
                if (data) {
                    setOffersData(data);
                    setOffersDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setOffersDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setLocationDetailsDataStatus(DataFetchingStatus.ERROR);
            });
    }, [selectedLocationID]);

    return {
        locationData: locationsData[selectedLocationID],
        locationDetailsData,
        locationDetailsDataStatus,
        eventsData,
        eventsDataStatus,
        offersData,
        offersDataStatus,
    };
};

export default useLocationData;
