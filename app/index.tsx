// Imports

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Styles

const styles = StyleSheet.create({
    flexFill: {
        flex: 1,
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    contentCenter: {
        justifyContent: 'center',
    },
    contentStart: {
        justifyContent: 'flex-start',
    },
    alignCenter: {
        alignItems: 'center',
    },
    gap20: {
        gap: 20,
    },
    pdAllRound: {
        padding: 20,
    },
    pdBottom: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }
});

// Exports

export default function Home() {

    return (
        <View style={[styles.columnContainer, styles.flexFill, styles.contentStart, styles.alignCenter]}>
            <Text style={[styles.pdAllRound]}>Task Manager</Text>
            <View style={[styles.rowContainer, styles.contentCenter, styles.alignCenter, styles.pdBottom, styles.gap20]}>
                <TouchableOpacity onPress={() => {console.log('View Tasks')}}>
                    <Text>View Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log('Completed Tasks')}}>
                    <Text>Completed Tasks</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}