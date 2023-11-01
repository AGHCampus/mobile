import { useEffect, useState } from 'react';
import { LocationData, fetchAllLocations } from '../api/locations';
import { DataFetchingStatus } from '../lib/CommonTypes';

export interface LocationsMap {
    [id: string]: LocationData;
}

const useLocationsData = () => {
    const [locationsData, setLocationsData] = useState<LocationsMap>({});
    const [locationsDataStatus, setLocationsDataStatus] = useState(
        DataFetchingStatus.LOADING,
    );

    useEffect(() => {
        fetchAllLocations()
            .then(data => {
                if (data) {
                    const locationsMap = data.reduce<LocationsMap>(
                        (acc, location) => {
                            acc[location.id] = location;
                            return acc;
                        },
                        {},
                    );

                    setLocationsData(locationsMap);
                    setLocationsDataStatus(DataFetchingStatus.SUCCESS);
                } else {
                    setLocationsDataStatus(DataFetchingStatus.ERROR);
                }
            })
            .catch(() => {
                setLocationsDataStatus(DataFetchingStatus.ERROR);
            });
    }, []);

    return {
        locationsData,
        locationsDataStatus,
    };
};

export default useLocationsData;
