import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image, Switch, Dimensions } from 'react-native';

import CardView from '../components/CardView';
import ProgressBar from 'react-native-progress/Bar';
import { useDebitCardDetails } from '../hooks/useDebitCardDetails';
import { currencyFormatter } from '../utility';

const windowWidth = Dimensions.get('window').width;

interface DebitCardScreenProps {
  navigation: Object
}

const DebitCardScreen = ({ navigation }) => {

  const { debitCardDetails, updateSpendingLimit } = useDebitCardDetails();

  const toggleSwitch = (enabled) => {

    if (enabled) {
      navigation.navigate('SpendingLimitScreen', debitCardDetails);
    } else {
      updateSpendingLimit(false, 0);
    }
  }

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    console.log('debitCardDetails', debitCardDetails);
  });

  return unsubscribe;
}, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.topLogoWrapper}>
        <Image
          resizeMode={"contain"}
          style={styles.logoImage}
          source={require('../assets/Logo.png')}
        />
      </View>
      <View style={styles.topStaticWrapper}>
        <Text
          style={styles.debitText}>Debit Card</Text>
        <Text style={styles.availableBalance}>Available balance</Text>
        <View style={styles.amountView}>
          <View style={styles.currencyView}>
            <Text style={styles.currencyText}>S$</Text>
          </View>
          <Text style={styles.amountText}>{debitCardDetails && debitCardDetails.available_balance && currencyFormatter(debitCardDetails.available_balance)}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainerView}
        >
          <View style={styles.contentView}>
            <CardView
              cardHolderName={debitCardDetails.card_holder_name}
              cardCVV={debitCardDetails.cvv}
              cardNumber={debitCardDetails.card_number}
              cardType={debitCardDetails.card_type}
              cardValidity={debitCardDetails.validity}
            />
            {
              debitCardDetails && debitCardDetails.set_weekly_limit &&
              <View
                style={styles.progressWrapperView}>
                <View style={styles.progressTitleLabelWrapper}>
                  <Text style={styles.rowTitleText}>Debit card spending limit</Text>
                  <View style={styles.progressDataWrapper}>
                    <Text style={styles.setLimitLabel}>${debitCardDetails.weekly_limit} </Text>
                    <Text style={styles.maxLimitLabel}>| ${debitCardDetails.max_limit}</Text>
                  </View>
                </View>
                <ProgressBar
                  style={styles.progressBar}
                  color={'#01D167'}
                  progress={0.4}
                  width={windowWidth * 0.9}
                  borderRadius={7}
                  height={15}
                />
              </View>
            }
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={"contain"}
                style={styles.optionImage}
                source={require('../assets/insight.png')}
              />
              <View style={[styles.rowTextWrapper, styles.topMargin]}>
                <Text style={styles.weeklyLimitTitle}>Top-up account</Text>
                <Text style={styles.descriptionLabel}>Deposit money to your account to use with card</Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={"contain"}
                style={styles.optionImage}
                source={require('../assets/Transfer_limit.png')}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>Weekly spending limit</Text>
                <Text style={styles.descriptionLabel}>You haven’t set any spending limit on card</Text>
              </View>

              <Switch
                style={styles.switch}
                trackColor={{ false: "#01D167", true: "#01D167" }}
                thumbColor={"#FFFFFF"}
                onValueChange={toggleSwitch}
                value={debitCardDetails ? debitCardDetails.set_weekly_limit : false}
              />
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={"contain"}
                style={styles.optionImage}
                source={require('../assets/insight.png')}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>Get a new card</Text>
                <Text style={styles.descriptionLabel}>This deactivates your current debit card</Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={"contain"}
                style={styles.optionImage}
                source={require('../assets/Transfer_limit.png')}
              />
              <View style={styles.rowTextWrapper}>
                <Text style={styles.weeklyLimitTitle}>Deactivated Cards</Text>
                <Text style={styles.descriptionLabel}>Your previously deactivated cards</Text>
              </View>
            </View>
            <View style={styles.optionsRowWrapper}>
              <Image
                resizeMode={"contain"}
                style={styles.optionImage}
                source={require('../assets/insight.png')}
              />
              <View style={[styles.rowTextWrapper, styles.bottomMargin]}>
                <Text style={styles.weeklyLimitTitle}>Freeze Card</Text>
                <Text style={styles.descriptionLabel}>Your previously deactivated cards</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C365A'
  },
  topLogoWrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginTop: 10
  },
  logoImage: {
    width: 25,
    height: 25
  },
  topStaticWrapper: {
    width: '100%',
  },
  scrollView: {
    top: -185,
  },
  scrollContainerView: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  contentView: {
    marginTop: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  progressWrapperView: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  progressTitleLabelWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10
  },
  progressDataWrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginLeft: 20
  },
  progressBar: {
    alignSelf: 'center'
  },
  debitText: {
    fontSize: 24,
    color: '#fff',
    padding: 20,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold'
  },
  currencyView: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#01D167'
  },
  currencyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
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
    alignItems: 'center'
  },
  amountText: {
    fontSize: 24,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#fff'
  },

  //
  weeklyLimitTitle: {
    color: '#25345F',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    fontWeight: '500'
  },
  descriptionLabel: {
    color: '#25345F',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    opacity: 0.4,
    width: '95%'
  },
  switch: {
    transform: [{ scaleX: .7 }, { scaleY: .7 }],
  },
  rowTitleText: {
    color: '#222222',
    fontFamily: 'Avenir Next',
  },
  setLimitLabel: { color: '#01D167' },
  maxLimitLabel: { color: '#22222233' },
  optionsRowWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 0,
    alignItems: 'center',
  },
  optionImage: {
    width: 30,
    height: 30
  },
  rowTextWrapper: {
    marginHorizontal: 10,
    width: '75%',
    marginVertical: 5,
    marginBottom: 20
  }, 
  topMargin:{
    marginTop: 20
  }, 
  bottomMargin:{
    marginBottom: 20
  }
});
