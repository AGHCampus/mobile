import Geolocation, {
	GeolocationError,
} from '@react-native-community/geolocation';
import type { GeolocationResponse } from '@react-native-community/geolocation';
import { Region } from 'react-native-maps';

export const getCurrentLocation = () => {
	return new Promise<GeolocationResponse>((resolve, reject) => {
		Geolocation.getCurrentPosition(
			position => resolve(position),
			e => reject(e),
			{ enableHighAccuracy: true },
		);
	});
};

export const handleGeolocationError = (err: GeolocationError) => {
	if (err.code === 1) {
		// TODO: Display location permission not enabled modal
	} else {
		// TODO: Display generic error modal
	}
};

const roundToDecimal = (value: number, decimal: number) => {
	const multiplier = Math.pow(10, decimal);
	return Math.round(value * multiplier) / multiplier;
};

export const areRegionsMatching = (newRegion: Region, oldRegion: Region) => {
	return (
		roundToDecimal(oldRegion.latitude, 3) ===
			roundToDecimal(newRegion.latitude, 3) &&
		roundToDecimal(oldRegion.longitude, 3) ===
			roundToDecimal(newRegion.longitude, 3)
	);
};
