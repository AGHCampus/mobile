import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
    TabView,
    TabBar,
    Route,
    SceneRendererProps,
    NavigationState,
} from 'react-native-tab-view';

import LocationDetailsOverviewTab from './LocationDetailsOverviewTab';
import LocationDetailsEventsTab from './LocationDetailsEventsTab';
import LocationDetailsOffersTab from './LocationDetailsOffersTab';
import { Colors } from '../../lib/Colors';
import { Shadows } from '../../lib/Shadows';

interface Props {
    selectedLocationID: string;
}

type TabBarProps = SceneRendererProps & {
    navigationState: NavigationState<Route>;
};

const LocationDetailsTabView = ({ selectedLocationID }: Props) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState<Route[]>([
        {
            key: 'overview',
            title: 'Overview',
        },
        {
            key: 'events',
            title: 'Events',
        },
        {
            key: 'offers',
            title: 'Offers',
        },
    ]);

    console.log('LocationDetailsTabView rerender');

    const renderScene = useCallback(
        ({ route }: { route: Route }) => {
            switch (route.key) {
                case 'overview':
                    return (
                        <LocationDetailsOverviewTab
                            selectedLocationID={selectedLocationID}
                        />
                    );
                case 'events':
                    return (
                        <LocationDetailsEventsTab
                            selectedLocationID={selectedLocationID}
                        />
                    );
                case 'offers':
                    return (
                        <LocationDetailsOffersTab
                            selectedLocationID={selectedLocationID}
                        />
                    );
                default:
                    return null;
            }
        },
        [selectedLocationID],
    );

    const renderTabBar = (props: TabBarProps) => (
        <TabBar
            {...props}
            style={[styles.tabBarContainer, Shadows.depth1]}
            labelStyle={styles.label}
            activeColor={Colors.accentGreen}
            inactiveColor={Colors.black}
            indicatorStyle={styles.indicator}
            pressColor="rgba(0, 0, 0, 0.1)" // ripple effect color (Android >= 5.0)
            pressOpacity={0.3} // press opacity (iOS and Android < 5.0)
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            swipeEnabled={false}
        />
    );
};

export default LocationDetailsTabView;

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: Colors.bgWhite,
        height: 38,
    },
    label: {
        fontSize: 16,
        textTransform: 'capitalize',
        top: -6,
    },
    indicator: {
        backgroundColor: Colors.accentGreen,
        height: 2,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
    },
});
