declare module '*.png' {
    import type { ImageSourcePropType } from 'react-native';

    const value: ImageSourcePropType;
    export default value;
}

declare module '*.gif' {
    const value: any;
    export default value;
}

declare module '*.lottie' {
    const value: any;
    export default value;
}
