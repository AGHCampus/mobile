import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';

export interface EventData {
    id: string;
    location_id: string;
    title?: string;
    description: string;
    image_url: string;
    start_date: string;
    end_date?: string;
    website_url?: string;
}

export const fetchAllEvents = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/event/all`);
        let sum = 0;
        for (let i = 0; i < 100000000; i++) {
            sum += i;
        }
        console.log(sum);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all events', error);
        return null;
    }
};

export const fetchLocationEvents = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/event/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching location events', error);
        return null;
    }
};

export const fetchAllOffers = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/offer/all`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all offers', error);
        return null;
    }
};

export const fetchLocationOffers = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/offer/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching location offers', error);
        return null;
    }
};
