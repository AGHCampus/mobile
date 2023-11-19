import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';

export interface EventData {
    id: string;
    locationId: string;
    title?: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate?: string;
    websiteUrl?: string;
}

export const fetchAllEvents = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all events', error);
        return null;
    }
};

export const fetchLocationEvents = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/events/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching location events', error);
        return null;
    }
};

export const fetchAllOffers = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/offers`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all offers', error);
        return null;
    }
};

export const fetchLocationOffers = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/offers/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching location offers', error);
        return null;
    }
};
