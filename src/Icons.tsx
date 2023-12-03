import Calendar from '../assets/Calendar.png';
import Info from '../assets/Info.png';
import Map from '../assets/Map.png';
import Offer from '../assets/Offer.png';
import Location from '../assets/Location.png';
import EmptyLocation from '../assets/Location_empty.png';
import AngleDown from '../assets/Angle_down.png';
import AngleUp from '../assets/Angle_up.png';
import ArrowLeft from '../assets/Arrow_left.png';
import Back from '../assets/Back.png';
import Search from '../assets/Search.png';
import MenuDots from '../assets/Menu_dots.png';
import MenuBurger from '../assets/Menu_burger.png';
import Website from '../assets/Website.png';
import Phone from '../assets/Phone.png';
import Share from '../assets/Share.png';
import Faculty from '../assets/Faculty.png';
import Dorm from '../assets/Dorm.png';
import Shop from '../assets/Shop.png';
import Club from '../assets/Club.png';
import Restaurant from '../assets/Restaurant.png';
import FacultyMarker from '../assets/Faculty_marker.png';
import DormMarker from '../assets/Dorm_marker.png';
import ShopMarker from '../assets/Shop_marker.png';
import ClubMarker from '../assets/Club_marker.png';
import RestaurantMarker from '../assets/Restaurant_marker.png';
import Sliders from '../assets/Sliders.png';
import SignOut from '../assets/SignOut.png';
import Portrait from '../assets/Portrait.png';
import SignIn from '../assets/SignIn.png';
import SignUp from '../assets/SignUp.png';
import Password from '../assets/Password.png';
import Marker from '../assets/Marker.png';
import MarkerSearch from '../assets/MarkerSearch.png';
import Eye from '../assets/Eye.png';
import CrossedEye from '../assets/CrossedEye.png';
import Facebook from '../assets/Facebook.png';
import Instagram from '../assets/Instagram.png';

export const icons = {
    Calendar: {
        src: Calendar,
    },
    Info: {
        src: Info,
    },
    Map: {
        src: Map,
    },
    Offer: {
        src: Offer,
    },
    Location: {
        src: Location,
    },
    EmptyLocation: {
        src: EmptyLocation,
    },
    AngleDown: {
        src: AngleDown,
    },
    AngleUp: {
        src: AngleUp,
    },
    ArrowLeft: {
        src: ArrowLeft,
    },
    Back: {
        src: Back,
    },
    Search: {
        src: Search,
    },
    MenuDots: {
        src: MenuDots,
    },
    MenuBurger: {
        src: MenuBurger,
    },
    Website: {
        src: Website,
    },
    Phone: {
        src: Phone,
    },
    Share: {
        src: Share,
    },
    Faculty: {
        src: Faculty,
    },
    Dorm: {
        src: Dorm,
    },
    Shop: {
        src: Shop,
    },
    Club: {
        src: Club,
    },
    Restaurant: {
        src: Restaurant,
    },
    FacultyMarker: {
        src: FacultyMarker,
    },
    DormMarker: {
        src: DormMarker,
    },
    ShopMarker: {
        src: ShopMarker,
    },
    ClubMarker: {
        src: ClubMarker,
    },
    RestaurantMarker: {
        src: RestaurantMarker,
    },
    Marker: {
        src: Marker,
    },
    Sliders: {
        src: Sliders,
    },
    SignOut: {
        src: SignOut,
    },
    Portrait: {
        src: Portrait,
    },
    SignIn: {
        src: SignIn,
    },
    SignUp: {
        src: SignUp,
    },
    Password: {
        src: Password,
    },
    MarkerSearch: {
        src: MarkerSearch,
    },
    Eye: {
        src: Eye,
    },
    CrossedEye: {
        src: CrossedEye,
    },
    Facebook: {
        src: Facebook,
    },
    Instagram: {
        src: Instagram,
    },
};

export function getLocationImageByCategory(category: string) {
    switch (category) {
        case 'faculty':
            return icons.Faculty.src;
        case 'dormitory':
            return icons.Dorm.src;
        case 'shop':
            return icons.Shop.src;
        case 'club':
            return icons.Club.src;
        case 'restaurant':
            return icons.Restaurant.src;
        default:
            return icons.Marker.src;
    }
}
