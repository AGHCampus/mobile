import i18n from '../utils/i18n';

export function getLocale() {
    return i18n.locale.slice(0, 2).toLowerCase();
}
