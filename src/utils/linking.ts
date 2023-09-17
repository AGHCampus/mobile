import { Linking } from 'react-native';

export async function openURL(url: string): Promise<boolean> {
    try {
        const openable = await Linking.canOpenURL(url);
        if (openable) {
            await Linking.openURL(url);
            return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
}
