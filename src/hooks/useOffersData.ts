import { useEffect, useState } from 'react';
import { EventData, fetchAllOffers } from '../api/events';
import { DataFetchingStatus } from '../lib/CommonTypes';

const useOffersData = () => {
    const [offersData, setOffersData] = useState<ReadonlyArray<EventData>>([]);
    const [offersDataStatus, setOffersDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    useEffect(() => {
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
    }, []);

    return {
        offersData,
        offersDataStatus,
    };
};

export default useOffersData;
