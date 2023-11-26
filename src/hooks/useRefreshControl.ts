import { useCallback, useEffect, useState } from 'react';
import { DataFetchingStatus } from '../lib/CommonTypes';

export default function useRefreshControl(
    dataStatus: DataFetchingStatus,
    refresh: () => void,
) {
    const [refreshing, setRefreshing] = useState(false);
    const [waitForAnimation, setWaitForAnimation] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setWaitForAnimation(true);
        setTimeout(() => {
            setWaitForAnimation(false);
        }, 1000);
        refresh();
    }, [refresh]);

    useEffect(() => {
        if (dataStatus !== DataFetchingStatus.REFRESHING && !waitForAnimation) {
            setRefreshing(false);
        }
    }, [dataStatus, waitForAnimation]);

    return { onRefresh, refreshing };
}
