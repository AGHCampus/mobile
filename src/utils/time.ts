import i18n from './i18n';

function getLocale() {
    return i18n.locale.replace('_', '-');
}

export function getEventDatetimeStringLong(date: Date) {
    const locale = getLocale();
    return `${date.toLocaleDateString(locale)} / ${date
        .toLocaleString(locale, {
            weekday: 'short',
        })
        .split(',')[0]
        .toUpperCase()} / ${date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })} `;
}

export function getEventDatetimeRangeString(startDate: Date, endDate: Date) {
    const locale = getLocale();

    return `${startDate.toLocaleDateString(
        locale,
    )} - ${endDate.toLocaleDateString(locale)} `;
}

export function getInfoDatetimeString(timestamp: string) {
    const date = new Date(timestamp);
    const locale = getLocale();
    return date.toLocaleDateString(locale).replace(/\//g, '.');
}
