import { useCallback, useEffect, useRef, useState } from 'react';
import { EventData, fetchAllOffers } from '../api/events';
import { DataFetchingStatus } from '../lib/CommonTypes';

const useOffersData = () => {
    const [offersData, setOffersData] = useState<ReadonlyArray<EventData>>([]);
    const [offersDataStatus, setOffersDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const isInitalFetch = useRef(true);

    const refresh = useCallback(() => {
        setRefreshTrigger(value => !value);
    }, []);

    useEffect(() => {
        if (!isInitalFetch.current) {
            setOffersDataStatus(DataFetchingStatus.REFRESHING);
        } else {
            isInitalFetch.current = false;
        }

        fetchAllOffers()
            .then(data => {
                if (data) {
                    setOffersData(data);
                    setOffersDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setOffersDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setOffersDataStatus(DataFetchingStatus.ERROR);
            });
    }, [refreshTrigger]);

    return {
        offersData,
        offersDataStatus,
        refresh,
    };
};

export default useOffersData;
