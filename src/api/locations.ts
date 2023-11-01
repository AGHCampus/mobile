import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { LatLng } from 'react-native-maps';

export interface LocationData {
    id: string;
    name: string;
    category: string;
    coordinate: LatLng;
    logo_url?: string;
}

export const fetchAllLocations = async () => {
    try {
        const response: AxiosResponse<LocationData[]> = await axios.get(
            `${API_URL}/location/all`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching locations', error);
        return null;
    }
};

export interface LocationDetailsData {
    address: string;
    description: string;
    phone_number: string;
    website_url: string;
    opening_hours: string;
    photos: string[];
}

export const fetchLocationDetails = async (locationId: string) => {
    try {
        const response: AxiosResponse<LocationDetailsData> = await axios.get(
            `${API_URL}/location/${locationId}/details`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching location details', error);
        return null;
    }
};
