import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    currentPrice: { 
        color: 'white', 
        fontSize: 30, 
        fontWeight: '600', 
        letterSpacing: 1 
    },
    name: {
        color: 'white', 
        fontSize: 15
    },
    priceContainer: { 
        padding: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    priceChange: { 
        color: 'white', 
        fontSize: 17, 
        fontWeight: '500' 
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 16,
        color: 'white'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#2B2B2B',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        // marginVertical: 10,
    },
});

export default styles