export function getEventDatetimeStringLong(date: Date) {
    // TODO: add locale
    return `${date.toLocaleDateString('pl-PL')} / ${date
        .toLocaleString('pl-PL', {
            weekday: 'short',
        })
        .split(',')[0]
        .toUpperCase()} / ${date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })} `;
}

export function getEventDatetimeRangeString(startDate: Date, endDate: Date) {
    // TODO: add locale
    return `${startDate.toLocaleDateString(
        'pl',
    )} - ${endDate.toLocaleDateString('pl')} `;
}
