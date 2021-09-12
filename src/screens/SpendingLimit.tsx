import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {updateCardDetails} from '../reducers/uiReducer';
import {currencyFormatter, updateCardSpendingLimit} from '../utility';
import Constants from '../utility/Constants';

const SpendingLimitScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const debitCardDetails = useSelector(state => state.debitCardDetails);
  const [amount, setAmount] = useState(Constants.suggestedLimits[0]);

  const updateSpendingLimit = async (isEnabled, limitAmount) => {
    try {
      const updatedCardDetails = await updateCardSpendingLimit(
        debitCardDetails,
        isEnabled,
        limitAmount,
      );
      dispatch(updateCardDetails(updatedCardDetails));
    } catch (e) {
      Alert.alert(Constants.check_network_connection)
    }
  };

  const onAmountChange = event => {
    let value = event.nativeEvent.text.trim().replace(/,/g, '');
    setAmount(currencyFormatter(value));
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapperView}>
          <View style={styles.navigationView}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon color={'#fff'} size={30} name={'keyboard-arrow-left'} />
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.rightLogo}
              source={require('../assets/Logo.png')}
            />
          </View>
          <Text style={styles.debitText}>{Constants.spending_limit_title}</Text>

          <View style={styles.roundedViewWrapper}>
            <View style={styles.setLimitView}>
              <View>
                <View style={styles.meterIconView}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.meterIcon}
                    source={require('../assets/limit_mark.png')}
                  />
                  <Text style={styles.spendingLimitText}>
                    {Constants.set_weekly_debit_limit}
                  </Text>
                </View>
                <View style={styles.amountView}>
                  <View style={styles.currencyView}>
                    <Text style={styles.currencyText}>
                      {Constants.currency}
                    </Text>
                  </View>
                  <TextInput
                    autoFocus
                    keyboardType="number-pad"
                    value={currencyFormatter(amount.toString())}
                    onChange={onAmountChange}
                    style={styles.amountText}
                  />
                </View>
                <View style={styles.separator} />

                <Text style={styles.descriptionText}>
                  {Constants.here_weekly_means_text}
                </Text>
                <View style={styles.amountSelectionView}>
                  {Constants.suggestedLimits.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.amountSelectionButton}
                      onPress={() => setAmount(value)}>
                      <Text style={styles.amountValue}>
                        {Constants.currency} {currencyFormatter(value)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  if (amount > 0) {
                    updateSpendingLimit(
                      true,
                      amount.toString().replace(/,/g, ''),
                    );
                    navigation.goBack();
                  } else {
                    Alert.alert(Constants.enter_valid_spending_limit)
                  }
                  
                }}>
                <Text style={styles.saveButtonText}>
                  {Constants.save_button_title}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SpendingLimitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0C365A',
  },
  wrapperView: {
    width: '100%',
    flex: 1,
  },
  roundedViewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  navigationView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  rightLogo: {
    width: 25,
    height: 25,
  },
  spendingLimitText: {
    color: '#222222',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    paddingHorizontal: 15,
  },
  debitText: {
    fontSize: 24,
    color: '#fff',
    margin: 20,
    marginBottom: 40,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
  },
  setLimitView: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    flexGrow: 1,
  },
  meterIconView: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meterIcon: {
    width: 25,
    height: 25,
  },
  currencyView: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#01D167',
  },
  currencyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  availableBalance: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
  },
  amountView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 24,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#222222',
    width: '90%',
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#01D167',
    width: 200,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 20,
  },
  saveButtonText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 16,
    color: '#fff',
  },
  amountSelectionView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  amountSelectionButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(1,209,103,0.6)',
  },
  amountValue: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  descriptionText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Avenir Next',
    marginTop: 20,
    marginHorizontal: 10,
    color: '#22222266',
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },
});
