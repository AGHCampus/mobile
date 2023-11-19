import React, { PropsWithChildren, useState } from 'react';
import {
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { DataFetchingStatus } from '../lib/CommonTypes';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';

interface Props {
    status: DataFetchingStatus;
    errorMessage?: string;
    padding?: number;
    refresh?: () => void;
}

export default function DataFetchStatusWrapper({
    status,
    errorMessage,
    padding = 0,
    refresh,
    children,
}: PropsWithChildren<Props>) {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        refresh && refresh();
        setTimeout(() => setRefreshing(false), 20000);
    };
    return (
        <>
            {status === DataFetchingStatus.LOADING && (
                <ActivityIndicator
                    color={Colors.activityIndicator}
                    style={styles.activityIndicator}
                />
            )}
            {(status === DataFetchingStatus.ERROR ||
                (refreshing && status === DataFetchingStatus.REFRESHING)) && (
                <ScrollView
                    style={{ padding: padding }}
                    refreshControl={
                        <RefreshControl
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    }>
                    <Text style={styles.errorTitle}>Error</Text>
                    <Text style={styles.errorText}>
                        {errorMessage || 'Failed to fetch data'}
                    </Text>
                </ScrollView>
            )}
            {(status === DataFetchingStatus.SUCCESS ||
                status === DataFetchingStatus.REFRESHING) &&
                children}
        </>
    );
}

const styles = StyleSheet.create({
    activityIndicator: {
        marginTop: Constants.SPACING_UNIT_24,
    },
    errorContainer: {
        flexDirection: 'column',
        padding: Constants.SPACING_UNIT_16,
    },
    errorTitle: {
        fontWeight: '500',
        fontSize: 22,
        color: Colors.black,
    },
    errorText: {
        fontWeight: '300',
        fontSize: 16,
        marginTop: Constants.SPACING_UNIT_8,
        color: Colors.black,
    },
});
