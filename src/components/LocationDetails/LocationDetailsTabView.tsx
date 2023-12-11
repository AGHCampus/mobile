import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Platform, StyleSheet } from 'react-native';
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
import useLocationData from '../../hooks/useLocationData';

const EXPAND_ANIMATION_DELAY = Platform.OS === 'ios' ? 250 : 0;

interface Props {
    selectedLocationID: string;
    bottomSheetSnapToIndex: (index: number) => void;
    bottomSheetCurrentIndex: number;
    selectedTabViewIndex: number;
    setSelectedTabViewIndex: Dispatch<SetStateAction<number>>;
}

type TabBarProps = SceneRendererProps & {
    navigationState: NavigationState<Route>;
};

const LocationDetailsTabView = ({
    selectedLocationID,
    bottomSheetSnapToIndex,
    bottomSheetCurrentIndex,
    selectedTabViewIndex,
    setSelectedTabViewIndex,
}: Props) => {
    const {
        locationData,
        locationDetailsData,
        locationDetailsDataStatus,
        eventsData,
        eventsDataStatus,
        offersData,
        offersDataStatus,
        refresh,
    } = useLocationData({
        selectedLocationID,
    });

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
                            locationDetailsDataStatus={
                                locationDetailsDataStatus
                            }
                            bottomSheetSnapToIndex={bottomSheetSnapToIndex}
                            bottomSheetCurrentIndex={bottomSheetCurrentIndex}
                        />
                    );
                case 'events':
                    return (
                        <LocationDetailsEventsTab
                            eventsData={eventsData}
                            locationData={locationData}
                            eventsDataStatus={eventsDataStatus}
                            refresh={refresh}
                        />
                    );
                case 'offers':
                    return (
                        <LocationDetailsOffersTab
                            offersData={offersData}
                            locationData={locationData}
                            offersDataStatus={offersDataStatus}
                            refresh={refresh}
                        />
                    );
                default:
                    return null;
            }
        },
        [
            locationData,
            locationDetailsData,
            locationDetailsDataStatus,
            eventsData,
            eventsDataStatus,
            offersData,
            offersDataStatus,
            bottomSheetSnapToIndex,
            bottomSheetCurrentIndex,
            refresh,
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
            onTabPress={() =>
                setTimeout(
                    () => bottomSheetSnapToIndex(2),
                    EXPAND_ANIMATION_DELAY,
                )
            }
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
