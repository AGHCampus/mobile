import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    TabBar,
    SceneRendererProps,
    NavigationState,
    TabBarIndicatorProps,
} from 'react-native-tab-view';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    WithSpringConfig,
    interpolateColor,
    withTiming,
} from 'react-native-reanimated';
import { RouteWithColor } from './LocationDetailsTabView';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';

type RenderLabelProps = {
    route: RouteWithColor;
    focused: boolean;
};

type Props = SceneRendererProps & {
    navigationState: NavigationState<RouteWithColor>;
};

const LocationDetailsTabBar = (props: Props) => {
    console.log('props.navigationState', props);

    const selected = useSharedValue(0);
    const position = useSharedValue(0);
    const indicatorColor = useSharedValue<string>(Colors.accentGreen);

    const indicatorAnimatedStyle = useAnimatedStyle(() => {
        const x = interpolate(selected.value, [0, 2], [3, 69.66]);

        position.value = withTiming(x, { duration: 250 });

        console.log('indicatorAnimatedStyle', x);

        return {
            backgroundColor: indicatorColor.value,
            left: `${position.value}%`,
        };
    });

    return (
        <TabBar
            {...props}
            // indicatorStyle={{ backgroundColor: 'black' }}
            renderLabel={({ route, focused }) => {
                const color = focused ? route.color : Colors.black;
                return (
                    <>
                        <Text style={[{ color }, styles.label]}>
                            {route.title}
                        </Text>
                    </>
                );
            }}
            renderIndicator={() => {
                return (
                    <Animated.View
                        style={[styles.indicator, indicatorAnimatedStyle]}
                    />
                );
            }}
            // indicatorStyle={[{ backgroundColor }, styles.indicator]}
            onTabPress={({ route }) => {
                indicatorColor.value = withTiming(route.color, {
                    duration: 250,
                });
                switch (route.key) {
                    case 'first':
                        selected.value = 0;
                        break;
                    case 'second':
                        selected.value = 1;
                        break;
                    case 'third':
                        selected.value = 2;
                        break;
                }
                console.log('onTabPress', route);
                // preventDefault();
            }}
            style={styles.container}
        />
    );
};

export default LocationDetailsTabBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgWhite,
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        height: 42,
    },
    label: {
        fontSize: 16,
        // height: 30,
    },
    indicator: {
        height: 2,
        borderRadius: 1,
        width: '27.33%',
        top: 40,
    },
});
