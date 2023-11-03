import { useEffect, useState } from 'react';
import { DataFetchingStatus } from '../lib/CommonTypes';
import { InfoData, fetchAllInformation } from '../api/information';

const useInfoData = () => {
    const [infoData, setInfoData] = useState<ReadonlyArray<InfoData>>([]);
    const [infoDataStatus, setInfoDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    useEffect(() => {
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
    }, []);

    return {
        infoData,
        infoDataStatus,
    };
};

export default useInfoData;
