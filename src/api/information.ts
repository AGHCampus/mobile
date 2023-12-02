import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import i18n from '../utils/i18n';

export interface InfoData {
    title: string;
    content: string;
    timestamp: string;
}

function getLocale() {
    return i18n.locale.slice(0, 2).toLowerCase();
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
