import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: '#282828',
        // padding: 15,
        justifyContent: 'space-between',
        paddingHorizontal: 10, 
        alignItems: 'center',
    },
    tickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tickerTitle: {
        color: 'white', 
        fontWeight: 'bold', 
        marginHorizontal: 5, 
        fontSize: 17,
    },
    tickerRank: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 15,
    },
    rankContainer: { 
        backgroundColor: '#585858',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    }
});

export default styles