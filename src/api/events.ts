import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { LatLng } from 'react-native-maps';
import { getLocale } from './utils';

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
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description: string;
    startDate: string;
}

export const fetchAllEvents = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/events?lang=${getLocale()}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all events', error);
        return null;
    }
};

export const fetchLocationEvents = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(
                `${API_URL}/events?locationId=${locationId}&lang=${getLocale()}`,
            );
        return response.data;
    } catch (error) {
        console.error('Error while fetching location events', error);
        return null;
    }
};

export const fetchAllOffers = async () => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(`${API_URL}/offers?lang=${getLocale()}`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching all offers', error);
        return null;
    }
};

export const fetchLocationOffers = async (locationId: string) => {
    try {
        const response: AxiosResponse<ReadonlyArray<EventData>> =
            await axios.get(
                `${API_URL}/offers?locationId=${locationId}&lang=${getLocale()}`,
            );
        return response.data;
    } catch (error) {
        console.error('Error while fetching location offers', error);
        return null;
    }
};

let privateEvent: PrivateEventData | null = null;

export const fetchPrivateEvent = async (eventId: string) => {
    try {
        const response: AxiosResponse<PrivateEventData> = await axios.get(
            `${API_URL}/private-events/${eventId}`,
        );
        return response.data;
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

export const createPrivateEvent = async (
    jwt: string,
    coordinate: LatLng,
    title: string,
    startDate: Date,
    description?: string,
) => {
    const startTime = startDate.toISOString().slice(0, 19);
    try {
        const response: AxiosResponse = await axios.post(
            `${API_URL}/private-events`,
            {
                coordinate: coordinate,
                title,
                startDate: startTime,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error while creating private event', error);
        return null;
    }
};
