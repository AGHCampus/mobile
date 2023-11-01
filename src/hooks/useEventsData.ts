import { useEffect, useState } from 'react';
import { EventData, fetchAllEvents } from '../api/events';
import { DataFetchingStatus } from '../lib/CommonTypes';

const useEventsData = () => {
    const [eventsData, setEventsData] = useState<ReadonlyArray<EventData>>([]);
    const [eventsDataStatus, setEventsDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    useEffect(() => {
        fetchAllEvents()
            .then(data => {
                if (data) {
                    setEventsData(data);
                    setEventsDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setEventsDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setEventsDataStatus(DataFetchingStatus.ERROR);
            });
    }, []);

    return {
        eventsData,
        eventsDataStatus,
    };
};

export default useEventsData;
