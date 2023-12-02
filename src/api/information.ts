import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { getLocale } from './utils';

export interface InfoData {
    title: string;
    content: string;
    timestamp: string;
}

export const fetchAllInformation = async () => {
    try {
        const response: AxiosResponse<InfoData[]> = await axios.get(
            `${API_URL}/information?lang=${getLocale()}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching information', error);
        return null;
    }
};
