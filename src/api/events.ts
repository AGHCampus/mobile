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

export interface PrivateEventData {
    id: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description: string;
    startTime: string;
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
            await axios.get(`${API_URL}/events?locationId=${locationId}`);
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
            await axios.get(`${API_URL}/offers?locationId=${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching location offers', error);
        return null;
    }
};

let privateEvent: PrivateEventData | null = null;

// TODO: Remove mock, add endpoint
export const fetchPrivateEvent = async (eventId: string) => {
    try {
        // const response: AxiosResponse<EventData> = await axios.get(
        //     `${API_URL}/private-events/${eventId}`,
        // );
        // return response.data;
        return {
            id: '1',
            coordinates: {
                latitude: 50.065638899794024,
                longitude: 19.91969686063426,
            },
            title: 'Private Event',
            description: 'Private Event',
            startTime: '2024-06-01T12:00:00.000Z',
        };
    } catch (error) {
        console.error('Error while fetching private event', error);
        return null;
    }
};

export const getPrivateEvent = async (
    eventId: string,
): Promise<PrivateEventData | null> => {
    if (privateEvent && privateEvent.id === eventId) {
        return privateEvent;
    } else {
        const eventData = await fetchPrivateEvent(eventId);
        privateEvent = eventData;
        return eventData;
    }
};
