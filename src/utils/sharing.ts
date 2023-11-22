import { LatLng } from 'react-native-maps';
import { LocationData } from '../api/locations';
import i18n from './i18n';
import { getCurrentLocation } from './geolocation';
import { Share } from 'react-native';
import { EventData } from '../api/events';
import { getEventDatetimeStringLong } from './time';

export const getLocationShareText = (locationData: LocationData) => {
    const shareText = `
    ${locationData.name}\n
    ${i18n.t('share.location_id')}\n
    ${getLocationIdDeeplink(locationData)}`;
    return shareText;
};

export const getEventShareText = (event: EventData, location: LocationData) => {
    const shareText = `
    ${i18n.t('share.event')}\n
    ${event.title}\n
    ${location.name}\n
    ${getEventDatetimeStringLong(new Date(event.startDate))}\n
    ${event.websiteUrl}`;
    return { message: shareText };
};

export const getCurrentLocationShareText = (coordinates: LatLng) => {
    const { latitude, longitude } = coordinates;
    const deeplink = `aghmap://map?coordinates=${latitude},${longitude}`;
    const shareText = `${i18n.t('share.current_location')}\n${deeplink}`;
    return shareText;
};

const getLocationIdDeeplink = (locationData?: LocationData) => {
    if (locationData) {
        return `aghmap://map?id=${locationData?.id}`;
    }
    return 'aghmap://map';
};

export const shareCurrentLocation = async () => {
    const currentLocation = await getCurrentLocation();
    Share.share({
        message: getCurrentLocationShareText(currentLocation.coords),
    });
};
