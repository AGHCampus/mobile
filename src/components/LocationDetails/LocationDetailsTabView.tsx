import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
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
import i18n from '../../utils/i18n';
import {
    EventData,
    LocationData,
    LocationDetailsData,
} from '../../lib/MockedData';

interface Props {
    locationData: LocationData;
    locationDetailsData: LocationDetailsData;
    eventsData: ReadonlyArray<EventData>;
    offersData: ReadonlyArray<EventData>;
    expandBottomSheet: () => void;
    selectedTabViewIndex: number;
    setSelectedTabViewIndex: Dispatch<SetStateAction<number>>;
}

type TabBarProps = SceneRendererProps & {
    navigationState: NavigationState<Route>;
};

const LocationDetailsTabView = ({
    locationData,
    locationDetailsData,
    eventsData,
    offersData,
    expandBottomSheet,
    selectedTabViewIndex,
    setSelectedTabViewIndex,
}: Props) => {
    const [routes] = useState<Route[]>([
        {
            key: 'overview',
            title: i18n.t('location.overview'),
        },
        {
            key: 'events',
            title: i18n.t('location.events'),
        },
        {
            key: 'offers',
            title: i18n.t('location.offers'),
        },
    ]);

    const renderScene = useCallback(
        ({ route }: { route: Route }) => {
            switch (route.key) {
                case 'overview':
                    return (
                        <LocationDetailsOverviewTab
                            locationData={locationData}
                            locationDetailsData={locationDetailsData}
                            expandBottomSheet={expandBottomSheet}
                        />
                    );
                case 'events':
                    return <LocationDetailsEventsTab eventsData={eventsData} />;
                case 'offers':
                    return <LocationDetailsOffersTab offersData={offersData} />;
                default:
                    return null;
            }
        },
        [
            locationData,
            locationDetailsData,
            eventsData,
            offersData,
            expandBottomSheet,
        ],
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
            onTabPress={expandBottomSheet}
        />
    );

    return (
        <TabView
            navigationState={{ index: selectedTabViewIndex, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setSelectedTabViewIndex}
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
