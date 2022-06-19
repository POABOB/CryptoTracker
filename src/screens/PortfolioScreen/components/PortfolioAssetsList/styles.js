import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  percentageChangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#16c784',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
  },
  currentBalance: { 
    color: 'white', 
    fontSize: 15, 
    fontWeight: '600', 
  },
  currentBalanceValue: {
    color: 'white', 
    fontSize: 35, 
    fontWeight: '300',
    letterSpacing: 0,
  },
  valueChange: {
    color: '#16c784', 
    fontSize: 16, 
    fontWeight: '500',
  },
  percentageChange: {
    color: 'white', 
    fontSize: 17, 
    fontWeight: '500',
  },
  assetsLabel: {
    color: 'white', 
    fontSize: 23, 
    fontWeight: '700',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#4169E1',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', 
    fontSize: 17, 
    fontWeight: '600',
  },
});

export default styles