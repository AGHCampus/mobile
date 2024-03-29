import i18n from './i18n';

function getLocale() {
    return i18n.locale.slice(0, 2).toLowerCase();
}

export function getEventDatetimeStringLong(date: Date) {
    const locale = getLocale();

    return `${date
        .toLocaleDateString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
        .replace(/\//g, '.')
        .split(', ')
        .join(' / ')}`;
}

export function getEventDatetimeRangeString(startDate: Date, endDate: Date) {
    const locale = getLocale();

    return `${startDate
        .toLocaleDateString(locale)
        .replace(/\//g, '.')} - ${endDate
        .toLocaleDateString(locale)
        .replace(/\//g, '.')}`;
}

export function getInfoDatetimeString(timestamp: string) {
    const date = new Date(timestamp);
    const locale = getLocale();
    return date.toLocaleDateString(locale).replace(/\//g, '.');
}

export function getEventDatetimeString(start: string, end: string | undefined) {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : null;
    const nextDay = new Date(startTime.getTime() + 86400000); // + 1 day in ms
    const shouldShowRange =
        endTime &&
        (endTime > nextDay || startTime.getDate() !== endTime.getDate());
    return shouldShowRange
        ? getEventDatetimeRangeString(startTime, endTime)
        : getEventDatetimeStringLong(startTime);
}
