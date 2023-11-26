import { useCallback, useEffect, useRef, useState } from 'react';
import { EventData, fetchAllEvents } from '../api/events';
import { DataFetchingStatus } from '../lib/CommonTypes';

const useEventsData = () => {
    const [eventsData, setEventsData] = useState<ReadonlyArray<EventData>>([]);
    const [eventsDataStatus, setEventsDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const isInitalFetch = useRef(true);

    const refresh = useCallback(() => {
        setRefreshTrigger(value => !value);
    }, []);

    useEffect(() => {
        if (!isInitalFetch.current) {
            setEventsDataStatus(DataFetchingStatus.REFRESHING);
        } else {
            isInitalFetch.current = false;
        }

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
    }, [refreshTrigger]);

    return {
        eventsData,
        eventsDataStatus,
        refresh,
    };
};

export default useEventsData;
