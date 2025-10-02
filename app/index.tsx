import { View, Text, StyleSheet } from 'react-native';

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
    contentStart: {
        justifyContent: 'flex-start',
    },
    alignCenter: {
        alignItems: 'center',
    }
});


export default function Home() {
    return (
        <View style={[styles.columnContainer, styles.flexFill, styles.contentStart, styles.alignCenter]}>
            <Text>Welcome to my portfolio</Text>
        </View>
    );
}