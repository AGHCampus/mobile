import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';

export interface InfoData {
    title: string;
    content: string;
    timestamp: string;
}

export const fetchAllInformations = async () => {
    try {
        const response: AxiosResponse<InfoData[]> = await axios.get(
            `${API_URL}/information/all`,
        );
        return response.data;
    } catch (error) {
        console.error('Error while fetching informations', error);
        return null;
    }
};
