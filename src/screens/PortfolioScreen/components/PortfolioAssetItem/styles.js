import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  priceContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',

  },
  quantityContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  ticker: {
    color: 'grey', 
    fontWeight: '600', 
  },
});

export default styles