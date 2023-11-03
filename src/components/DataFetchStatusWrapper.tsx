import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DataFetchingStatus } from '../lib/CommonTypes';
import { Constants } from '../lib/Constants';
import { Colors } from '../lib/Colors';

interface Props {
    status: DataFetchingStatus;
    errorMessage?: string;
    padding?: number;
}

export default function DataFetchStatusWrapper({
    status,
    errorMessage,
    padding = 0,
    children,
}: PropsWithChildren<Props>) {
    return (
        <>
            {status === DataFetchingStatus.LOADING && (
                <ActivityIndicator
                    color={Colors.activityIndicator}
                    style={styles.activityIndicator}
                />
            )}
            {status === DataFetchingStatus.ERROR && (
                <View style={{ padding: padding }}>
                    <Text style={styles.errorTitle}>Error</Text>
                    <Text style={styles.errorText}>
                        {errorMessage || 'Failed to fetch data'}
                    </Text>
                </View>
            )}
            {status === DataFetchingStatus.SUCCESS && children}
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
