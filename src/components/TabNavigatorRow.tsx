import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { IconType } from './Icon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import BottomSpacer from './BottomSpacer';

export default class TabNavigationRow extends Component<BottomTabBarProps> {
    static defaultProps = {
        insets: {},
    };
    getAssetForLabel(label: string): IconType {
        switch (label) {
            case 'Offers':
                return 'Offer';
            case 'Events':
                return 'Calendar';
            default:
                return label as IconType;
        }
    }

    getTabNotificationStyle() {
        // TODO: Return extra styling to display notification if needed
        return null;
    }

    render(): ReactNode {
        const { state, descriptors, navigation } = this.props;
        return (
            <>
                <View style={styles.row}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label = options.title ?? route.name;
                        const isFocused = state.index === index;
                        const tabColor = isFocused ? '#19A561' : 'black';

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                                navigation.navigate({
                                    name: route.name,
                                    params: route.params,
                                    merge: true,
                                });
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={
                                    isFocused ? { selected: true } : {}
                                }
                                accessibilityLabel={
                                    options.tabBarAccessibilityLabel
                                }
                                testID={options.tabBarTestID}
                                key={`tabButton_${index}`}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.buttonContainer}>
                                <View>
                                    <Icon
                                        asset={this.getAssetForLabel(label)}
                                        color={tabColor}
                                    />
                                    <View
                                        style={[
                                            this.getTabNotificationStyle(),
                                            styles.tabNotification,
                                        ]}
                                    />
                                </View>

                                <Text
                                    style={{
                                        color: tabColor,
                                    }}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <BottomSpacer />
            </>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        height: 60,
        flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    tabNotification: {
        width: 8,
        height: 8,
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 24,
    },
});
