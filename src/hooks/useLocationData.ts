import { useContext, useEffect, useRef, useState } from 'react';
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

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const isInitalFetch = useRef(true);

    const refresh = () => {
        setRefreshTrigger(value => !value);
    };

    useEffect(() => {
        if (!selectedLocationID) {
            return;
        }
        if (isInitalFetch.current) {
            isInitalFetch.current = false;
        } else {
            setLocationDetailsDataStatus(DataFetchingStatus.REFRESHING);
            setEventsDataStatus(DataFetchingStatus.REFRESHING);
            setOffersDataStatus(DataFetchingStatus.REFRESHING);
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
    }, [selectedLocationID, refreshTrigger]);

    return {
        locationData: locationsData[selectedLocationID],
        locationDetailsData,
        locationDetailsDataStatus,
        eventsData,
        eventsDataStatus,
        offersData,
        offersDataStatus,
        refresh,
    };
};

export default useLocationData;
