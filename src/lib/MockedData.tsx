import { LatLng } from 'react-native-maps';

export interface EventData {
    id: string;
    title?: string;
    description: string;
    imageUrl: string;
    locationName: string;
    startTime: Date;
    endTime?: Date;
    websiteUrl?: string;
    locationCoordinate?: LatLng;
    locationLogoUrl?: string;
}

export const TEMP_EVENTS_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        title: `Tokio Hotel
BEYOND THE WORLD TOUR 2023`,
        description:
            'Już 22 maja na jedynym koncercie w Polsce wystąpi niemiecka grupa Tokio Hotel. Ze względów logistycznych koncert ten odbędzie się w innym miejscu, zamiast w katowickim MCKu zespół zagra w krakowskim Klubie Studio. Przepraszamy za wszelkie niedogodności wynikające ze zmiany lokalizacji koncertu i jednocześnie informujemy, że wszystkie bilety zakupione na koncert, który pierwotnie miał odbyć się w 2021 roku, a także w nowym terminie w 2022 i 2023 w katowickim MCKu, zachowują swoją ważność na występ zespołu w krakowskim Klubie Studio. Osoby, które z różnych przyczyn będą chciały zwrócić bilet na to wydarzenie, będą mogły to uczynić w punktach, w których taki bilet zakupiły.',
        imageUrl:
            'https://www.klubstudio.pl/media/cache/event_slider_800/uploads/photo/_0/th-750x500-studio-640b307fe1c05910495534.jpg.webp',
        websiteUrl: 'https://www.google.com',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06805101572392,
            longitude: 19.90836342605491,
        },
        locationName: 'Klub Studio',
        locationLogoUrl:
            'https://www.szarpidrut.pl/website_assets/files/2018/04/photos/studio-logo.png',
    },
    {
        id: '2',
        title: 'JUWENALIOWE DISCO WITH THE STARS',
        description:
            'Po występach Juwenaliowych 17 maja zapraszamy Was na jedyne i niepowtarzalne afterparty, czyli ✨ JUWENALIOWE DISCO WITH THE STARS ✨ w Klubie Studio Jego główną gwiazdą będzie Gromee! 😎',
        imageUrl:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRfQkCwON86vHsmNM-v3JhQx350VsZuikAWfTmBU0BMxkDVvGLJ',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        endTime: new Date('2023-06-22T22:00:00+02:00'),
        websiteUrl: 'https://www.google.com',
        locationName: 'Akademia Górniczo-Hutnicza',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },
    {
        id: '3',
        title: 'Event 3',
        description: 'Event 3 description \n a \n b \n c \n d \n e',
        imageUrl: 'https://picsum.photos/2137',
        startTime: new Date('2023-06-27T21:30:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'Instytut Informatyki',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },

    {
        id: '4',
        title: 'Event 4',
        description: 'Event 4 description',
        imageUrl: 'https://picsum.photos/847',
        startTime: new Date('2023-06-29T11:30:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'SWFiS AGH',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },

    {
        id: '5',
        title: 'Event 5',
        description: 'Event 5 description',
        imageUrl: 'https://picsum.photos/1632',
        startTime: new Date('2023-07-04T16:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.0680619382141,
            longitude: 19.912568786594342,
        },
        locationName: 'Wydział Matematyki Stosowanej',
        locationLogoUrl:
            'https://www.lodplanner.com/wp-content/uploads/AGH-University-of-Science-and-Technology-Logo.png',
    },
] as const;

export const TEMP_OFFER_DATA: ReadonlyArray<EventData> = [
    {
        id: '1',
        description:
            'Loodomaniaku, chcesz rabat? Możesz go sobie wziąć! Weź udział w naszym urodzinowym challenge i zdobądź rabat 5%, a nawet 10% na wielokrotny zakup porcji loodów,  loodboxów oraz kremów Good Noot! Na siódme urodziny prezent idealny: 5% €- zdobędziesz odwiedzając nas w ten długi weekend przez trzy różne dni, kupując zawsze minimum porcję loodów. 10% otrzymasz, gdy przez wszystkie pięć rożnych dni kupisz w Good Lood przynajmniej porcję loodów. Kiedy musisz nas odwiedzić? Od 29.04 do 3.05 I teraz najlepsze, z rabatu skorzystasz wielokrotnie, przez pięć dni! Od 8 do 12 maja. Jeśli spełnisz warunki promocji, swoje hasło dające możliwość odebrania rabatu otrzymasz w wiadomości w Good Lood App, którą wyślemy do Ciebie 8 maja Promocja realizowana jest w ramach programu lojalnościowego w Good Lood App i obowiązuje tylko stacjonarnie. Rabat będzie można zrealizować wyłącznie z zainstalowaną aplikacją na telefonie, w której pojawi się wiadomość z kodem. Mamy nadzieję, że zrobiliśmy Ci już plan na majówkę',
        imageUrl:
            'https://pa.goodlood.com/old-website-slider-images/baner-loodcart-vouchery-desktop-3840x1938.webp',
        startTime: new Date('2023-06-20T10:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06872094498266,
            longitude: 19.90529235466219,
        },
        locationName: 'Good Lood',
        locationLogoUrl:
            'https://scontent-waw1-1.xx.fbcdn.net/v/t39.30808-6/347248821_573873638274193_3401697977579833877_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Em3YIW_gYvwAX-iRHON&_nc_ht=scontent-waw1-1.xx&oh=00_AfCCFDbpj9Ckoo7m2g6KDoAoGB298S72ZJz4L4wEecInFw&oe=65315A7D',
    },
    {
        id: '2',
        description:
            'Studenckie rollo - Duże rollo w cenie małego po okazaniu legitymacji studenckiej.',
        imageUrl:
            'https://restaumatic-production.imgix.net/uploads/accounts/34896/media_library/58026fe4-3591-4d08-9788-e3bc8bae94d2.jpg',
        startTime: new Date('2023-10-01T10:00:00+02:00'),
        endTime: new Date('2024-07-01T00:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.06827159372157,
            longitude: 19.91452734081454,
        },
        locationName: 'Kebab Ali Baba',
    },
    {
        id: '3',
        description:
            'Tańsze ksero i druk - Tylko dla studentów, 10% zniżki na ksero i druk po okazaniu legitymacji studenckiej.',
        imageUrl: 'https://neograf24.pl/_files/img/offer/kserografia/ksero.jpg',
        startTime: new Date('2023-10-01T10:00:00+02:00'),
        endTime: new Date('2024-07-01T00:00:00+02:00'),
        locationCoordinate: {
            latitude: 50.068268964913656,
            longitude: 19.909066544600243,
        },
        locationName: 'Ksero Kapitol',
    },
] as const;
