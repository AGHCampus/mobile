import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';

export const login = async (email: string, password: string) => {
    try {
        const response: AxiosResponse<{ username: string; jwt: string }> =
            await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
        return response;
    } catch (error: any) {
        console.error('Login error', error);
        return error.response;
    }
};

export const register = async (
    email: string,
    username: string,
    password: string,
    lang?: string,
) => {
    try {
        const response: AxiosResponse<{ username: string }> = await axios.post(
            `${API_URL}/auth/register${lang ? `?lang=${lang}` : ''}`,
            {
                email,
                username,
                password,
            },
        );
        return response;
    } catch (error) {
        console.error('Register error', error);
        return null;
    }
};

export const resetPassword = async (email: string, lang?: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/reset-password${lang ? `?lang=${lang}` : ''}`,
            {
                email,
            },
        );
        return response;
    } catch (error) {
        console.error('Reset password error', error);
        return null;
    }
};

export const changePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string,
) => {
    try {
        const response = await axios.post(`${API_URL}/auth/change-password`, {
            email,
            oldPassword,
            newPassword,
        });
        return response;
    } catch (error) {
        console.error('Change password error', error);
        return null;
    }
};
