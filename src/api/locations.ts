import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { LatLng } from 'react-native-maps';
import { getLocale } from './utils';

export interface LocationData {
    id: string;
    name: string;
    category: string;
    coordinate: LatLng;
    address: string;
    logoUrl?: string;
}

export const fetchAllLocations = async () => {
    try {
        const response: AxiosResponse<LocationData[]> = await axios.get(
            `${API_URL}/locations?lang=${getLocale()}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching locations', error);
        return null;
    }
};

export interface LocationDetailsData {
    description: string;
    phoneNumber: string;
    websiteUrl: string;
    openingHours: string;
    photos: string[];
}

export const fetchLocationDetails = async (locationId: string) => {
    try {
        const response: AxiosResponse<LocationDetailsData> = await axios.get(
            `${API_URL}/locations/${locationId}/details?lang=${getLocale()}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching location details', error);
        return null;
    }
};
