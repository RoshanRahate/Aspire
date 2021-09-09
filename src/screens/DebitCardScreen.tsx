import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Button, Image, Switch } from 'react-native';

import CardView from '../components/CardView';

interface DebitCardScreenProps {
  navigation: Object
}

const DebitCardScreen = ({ navigation }) => {
  console.log(navigation);

  const [isEnabled, setIsEnabled] = useState(false);
  const [debitCardDetails, setDebitCardDetails] = useState({})

  useEffect(() => {
    const getDebitCardDetails = async () => {
      // setLoading(true);
      try {
        const transactions = await fetch("http://localhost:3000/debit_card");
        const rawTransactions = await transactions.json();
        console.log(rawTransactions);
        setDebitCardDetails(rawTransactions);
        // setTransactionsData(formattedTransactions);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        // setLoading(false);
        // Alert.alert(error);
      }
    };

    getDebitCardDetails();
  }, []);

  const toggleSwitch = (enabled) => {
    setIsEnabled(enabled);
    enabled && navigation.navigate('SpendingLimitScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20 }}>
        <Image
          resizeMode={"contain"}
          style={{ width: 25, height: 25 }}
          source={require('../assets/Logo.png')}
        />
      </View>
      <View style={{
        backgroundColor: 'grey',
        width: '100%'
      }}>
        <Text style={styles.debitText}>Debit Card</Text>
        <Text style={styles.availableBalance}>Available balance</Text>
        <View style={styles.amountView}>
          <View style={styles.currencyView}>
            <Text style={styles.currencyText}>S$</Text>
          </View>
          <Text style={styles.amountText}>{debitCardDetails && debitCardDetails.available_balance}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ position: 'relative', backgroundColor: '#fff', width: '100%' }}>
          <CardView
            cardHolderName={debitCardDetails.card_holder_name}
            cardCVV={debitCardDetails.cvv}
            cardNumber={debitCardDetails.card_number}
            cardType={debitCardDetails.card_type}
            cardValidity={debitCardDetails.validity}
          />

          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, alignItems: 'center', }}>
            <Image
              resizeMode={"contain"}
              style={{ width: 30, height: 30 }}
              source={require('../assets/Transfer_limit.png')}
            />
            <View style={{ marginHorizontal: 10, marginVertical: 10, }}>
              <Text style={styles.weeklyLimitTitle}>Top-up account</Text>
              <Text style={styles.descriptionLabel}>Deposit money to your account to use with card</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, alignItems: 'center', }}>
            <Image
              resizeMode={"contain"}
              style={{ width: 30, height: 30 }}
              source={require('../assets/Transfer_limit.png')}
            />
            <View style={{ marginHorizontal: 10, width: '75%', margin: 10, }}>
              <Text style={styles.weeklyLimitTitle}>Weekly spending limit</Text>
              <Text style={styles.descriptionLabel}>You haven’t set any spending limit on card</Text>
            </View>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#01D167", true: "#01D167" }}
              thumbColor={"#FFFFFF"}
              onValueChange={toggleSwitch}
              value={debitCardDetails.set_weekly_limit}
            />
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, alignItems: 'center', }}>
            <Image
              resizeMode={"contain"}
              style={{ width: 30, height: 30 }}
              source={require('../assets/Transfer_limit.png')}
            />
            <View style={{ marginHorizontal: 10, width: '75%', marginVertical: 10, }}>
              <Text style={styles.weeklyLimitTitle}>Get a new card</Text>
              <Text style={styles.descriptionLabel}>This deactivates your current debit card</Text>
            </View>
          </View>
        </View>
      </ScrollView>


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
  debitText: {
    fontSize: 24,
    color: '#fff',
    margin: 20,
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
    marginHorizontal: 20,
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
    paddingLeft: 10, color: '#fff'
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
    opacity: 0.4
  },
  switch: { transform: [{ scaleX: .7 }, { scaleY: .7 }] }

});
