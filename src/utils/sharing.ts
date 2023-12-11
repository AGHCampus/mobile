import { LatLng } from 'react-native-maps';
import { LocationData } from '../api/locations';
import i18n from './i18n';
import { getCurrentLocation } from './geolocation';
import { Share } from 'react-native';
import { EventData } from '../api/events';
import { getEventDatetimeStringLong } from './time';

const joinRows = (rows: Array<string | undefined>) =>
    rows.filter(row => row).join('\n');

const getLocationIdDeeplink = (locationData?: LocationData) => {
    if (locationData) {
        return `aghmap://map?id=${locationData?.id}`;
    }
    return 'aghmap://map';
};

export const getLocationShareText = (locationData: LocationData) => {
    const rows = [
        locationData.name,
        i18n.t('share.location_id'),
        getLocationIdDeeplink(locationData),
    ];
    return joinRows(rows);
};

export const getEventShareText = (event: EventData, location: LocationData) => {
    const dateStr = getEventDatetimeStringLong(new Date(event.startDate));
    const rows = [
        i18n.t('share.event'),
        location.name,
        event.title,
        dateStr,
        event.websiteUrl,
    ];
    return { message: joinRows(rows) };
};

export const getOfferShareText = (offer: EventData, location: LocationData) => {
    const rows = [i18n.t('share.offer'), location.name, offer.description];
    return { message: joinRows(rows) };
};

export const getCurrentLocationShareText = (coordinates: LatLng) => {
    const { latitude, longitude } = coordinates;
    const deeplink = `aghmap://map?coordinates=${latitude},${longitude}`;
    const shareText = `${i18n.t('share.current_location')}\n${deeplink}`;
    return shareText;
};

export const getInfoShareText = (title: string, content: string) => {
    const rows = [title, content];
    return joinRows(rows);
};

export const shareCurrentLocation = async () => {
    const currentLocation = await getCurrentLocation();
    Share.share({
        message: getCurrentLocationShareText(currentLocation.coords),
    });
};
