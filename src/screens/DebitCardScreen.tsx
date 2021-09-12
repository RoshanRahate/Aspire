import React, {useEffect} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Switch,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
import Aspire_Logo_V2 from '../assets/Logo.png';
import Insight_Logo from '../assets/insight.png';
import Transfer_Limit_Logo from '../assets/Transfer_limit.png';
import {setCardDetails, updateCardDetails} from '../reducers/uiReducer';
import CardView from '../components/CardView';
import {currencyFormatter} from '../utility';
import {updateCardSpendingLimit, getDebitCardDetails} from '../utility';
import Constants, {AVAILABLE_ROUTES} from '../utility/Constants';

const windowWidth = Dimensions.get('window').width;

const DebitCardScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const debitCardDetails = useSelector(state => state.debitCardDetails);

  useEffect(() => {
    async function getData() {
      try {
        const cardDetails = await getDebitCardDetails();
        dispatch(setCardDetails(cardDetails));
      } catch (e) {
        Alert.alert(Constants.check_network_connection);
      }
    }
    getData();
  }, [dispatch]);

  const toggleSwitch = enabled => {
    if (enabled) {
      navigation.navigate(
        AVAILABLE_ROUTES.SPENDING_LIMIT_SCREEN,
        debitCardDetails,
      );
    } else {
      updateSpendingLimit(false, 0);
    }
  };

  const updateSpendingLimit = async (isEnabled, amount) => {
    try {
      const updatedCardDetails = await updateCardSpendingLimit(
        debitCardDetails,
        isEnabled,
        amount,
      );
      dispatch(updateCardDetails(updatedCardDetails));
    } catch (e) {
      Alert.alert(Constants.check_network_connection);
    }
  };

  const getProgressValue = () => {
    return Math.min(
      debitCardDetails &&
        debitCardDetails.weekly_limit / debitCardDetails.max_limit,
      1,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLogoWrapper}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={Aspire_Logo_V2}
        />
      </View>
      <View style={styles.topStaticWrapper}>
        <Text style={styles.debitText}>{Constants.debit_card_label}</Text>
        <Text style={styles.availableBalance}>
          {Constants.available_balance}
        </Text>
        <View style={styles.amountView}>
          <View style={styles.currencyView}>
            <Text style={styles.currencyText}>{Constants.currency}</Text>
          </View>
          <Text style={styles.amountText}>
            {debitCardDetails &&
              debitCardDetails.available_balance &&
              currencyFormatter(debitCardDetails.available_balance)}
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainerView}>
          <View style={styles.contentView}>
            {debitCardDetails && debitCardDetails.set_weekly_limit && (
              <View style={styles.progressWrapperView}>
                <View style={styles.progressTitleLabelWrapper}>
                  <Text style={styles.rowTitleText}>
                    {Constants.debit_card_spending_limit}
                  </Text>
                  <View style={styles.progressDataWrapper}>
                    <Text style={styles.setLimitLabel}>
                      $
                      {debitCardDetails.weekly_limit &&
                        currencyFormatter(debitCardDetails.weekly_limit)}{' '}
                    </Text>
                    <Text style={styles.maxLimitLabel}>
                      | $
                      {debitCardDetails.max_limit &&
                        currencyFormatter(debitCardDetails.max_limit)}
                    </Text>
                  </View>
                </View>
                <ProgressBar
                  style={styles.progressBar}
                  color="#01D167"
                  progress={getProgressValue()}
                  width={windowWidth * 0.9}
                  borderRadius={7}
                  borderWidth={0}
                  unfilledColor="#E5FAF0"
                  height={14}
                />
              </View>
            )}
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode="contain"
                style={styles.optionImage}
                source={Insight_Logo}
              />
              <View style={[styles.rowTextWrapper, styles.topMargin]}>
                <Text style={styles.weeklyLimitTitle}>
                  {Constants.top_up_account}
                </Text>
                <Text style={styles.descriptionLabel}>
                  {Constants.deposit_money_to_your_account}
                </Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode="contain"
                style={styles.optionImage}
                source={Transfer_Limit_Logo}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>
                  {Constants.weekly_spending_limit}
                </Text>
                <Text style={styles.descriptionLabel}>
                  {Constants.you_havent_set_limit}
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: '#01D167', true: '#01D167'}}
                thumbColor="#FFFFFF"
                onValueChange={toggleSwitch}
                value={
                  debitCardDetails ? debitCardDetails.set_weekly_limit : false
                }
              />
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.optionImage}
                source={Insight_Logo}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>
                  {Constants.get_a_new_card}
                </Text>
                <Text style={styles.descriptionLabel}>
                  {Constants.this_deactivates_your_debit_card}
                </Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode="contain"
                style={styles.optionImage}
                source={Transfer_Limit_Logo}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>
                  {Constants.deactivated_cards}
                </Text>
                <Text style={styles.descriptionLabel}>
                  {Constants.your_previously_deactivated_cards}
                </Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode="contain"
                style={styles.optionImage}
                source={Insight_Logo}
              />
              <View style={[styles.rowTextWrapper, styles.bottomMargin]}>
                <Text style={styles.weeklyLimitTitle}>
                  {Constants.freeze_cards}
                </Text>
                <Text style={styles.descriptionLabel}>
                  {Constants.your_card_is_currently_active}
                </Text>
              </View>
            </View>
          </View>
          <CardView
            cardHolderName={debitCardDetails.card_holder_name}
            cardCVV={debitCardDetails.cvv}
            cardNumber={debitCardDetails.card_number}
            cardType={debitCardDetails.card_type}
            cardValidity={debitCardDetails.validity}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0C365A',
  },
  topLogoWrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoImage: {
    width: 25,
    height: 25,
  },
  topStaticWrapper: {
    width: '100%',
  },
  scrollView: {
    // @TODO update hardcoded styles
    top: -185, //-windowHeight * 0.27,
  },
  scrollContainerView: {
    backgroundColor: 'transparent',
    width: '100%',
    // @TODO
    paddingTop: 250, //windowHeight * 0.35
  },
  contentView: {
    // @TODO
    paddingTop: 160, // windowHeight * 0.22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  progressWrapperView: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  progressTitleLabelWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  progressDataWrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 20,
  },
  progressBar: {
    alignSelf: 'center',
  },
  debitText: {
    color: '#fff',
    fontSize: 24,
    padding: 20,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
  },
  amountView: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 24,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#fff',
  },

  //
  weeklyLimitTitle: {
    color: '#25345F',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
  },
  descriptionLabel: {
    color: '#25345F',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    opacity: 0.4,
    width: '95%',
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  rowTitleText: {
    color: '#222222',
    fontFamily: 'Avenir Next',
  },
  setLimitLabel: {color: '#01D167'},
  maxLimitLabel: {color: '#22222233'},
  optionsRowWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  optionImage: {
    width: 30,
    height: 30,
  },
  rowTextWrapper: {
    marginHorizontal: 10,
    width: '75%',
    marginVertical: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  topMargin: {
    marginTop: 20,
  },
  bottomMargin: {
    marginBottom: 20,
  },
});
