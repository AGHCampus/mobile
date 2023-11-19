import { useCallback, useEffect, useRef, useState } from 'react';
import { DataFetchingStatus } from '../lib/CommonTypes';
import { InfoData, fetchAllInformation } from '../api/information';

const useInfoData = () => {
    const [infoData, setInfoData] = useState<ReadonlyArray<InfoData>>([]);
    const [infoDataStatus, setInfoDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const isInitalFetch = useRef(true);

    const refresh = useCallback(() => {
        setRefreshTrigger(value => !value);
    }, []);

    useEffect(() => {
        if (!isInitalFetch.current) {
            setInfoDataStatus(DataFetchingStatus.REFRESHING);
        } else {
            isInitalFetch.current = false;
        }

        fetchAllInformation()
            .then(data => {
                if (data) {
                    setInfoData(data);
                    setInfoDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setInfoDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setInfoDataStatus(DataFetchingStatus.ERROR);
            });
    }, [refreshTrigger]);

    return {
        infoData,
        infoDataStatus,
        refresh,
    };
};

export default useInfoData;
