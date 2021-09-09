import React, { useState, } from 'react';
import { Image, View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SpendingLimitScreenProps { }

const SpendingLimitScreen = (props: SpendingLimitScreenProps) => {

    const [amount, setAmount] = useState('5000');

    const onAmountChange = (event) => {
        let amount = event.nativeEvent.text.trim()
        setAmount(currencyFormatter(amount))
    }


    const currencyFormatter = value => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', }}>
                <View style=
                    {{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={props.navigation.goBack}>
                        <Icon color={'#fff'} size={30} name={'keyboard-arrow-left'} />
                    </TouchableOpacity>
                    <Image
                        resizeMode={"contain"}
                        style={styles.rightLogo}
                        source={require('../assets/Logo.png')}
                    />
                </View>
                <Text style={styles.debitText}>Spending Limit</Text>

                <View style={styles.setLimitView}>
                    <View style={styles.meterIconView}>
                        <Image
                            resizeMode={"contain"}
                            style={styles.meterIcon}
                            source={require('../assets/limit_mark.png')}
                        />
                        <Text style={styles.spendingLimitText}>Set a weekly debit card spending limit</Text>
                    </View>
                    <View style={styles.amountView}>
                        <View style={styles.currencyView}>
                            <Text style={styles.currencyText}>S$</Text>
                        </View>
                        <TextInput
                            keyboardType='number-pad'
                            value={amount}
                            onChange={onAmountChange}
                            style={styles.amountText}></TextInput>
                    </View>
                    <View style={styles.separator} />

                    <Text style={styles.descriptionText}>Here weekly means the last 7 days - not the calendar week</Text>
                    <View style={styles.amountSelectionView}>
                        <TouchableOpacity
                            style={styles.amountSelectionButton}
                            onPress={() => setAmount('5,000')}>
                            <Text style={styles.amountValue}>S$ 5,000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.amountSelectionButton}
                            onPress={() => setAmount('10,000')}>
                            <Text style={styles.amountValue}>S$ 10,000</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.amountSelectionButton}
                            onPress={() => setAmount('20,000')}>
                            <Text style={styles.amountValue}>S$ 20,000</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => console.log("prees")}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
};

export default SpendingLimitScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0C365A'
    },
    rightLogo: {
        width: 25,
        height: 25
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
        fontWeight: 'bold'
    },
    setLimitView: {
        backgroundColor: '#fff',
        height: '85%',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24
    },
    meterIconView: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    meterIcon: {
        width: 25,
        height: 25
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
        paddingLeft: 10,
        color: '#222222'
    },
    saveButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#01D167',
        width: 200,
        paddingHorizontal: 40,
        paddingVertical: 8,
        // height: 40,
        borderRadius: 20,
    },
    saveButtonText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 16,
        color: '#fff'
    },
    amountSelectionView: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
        justifyContent: 'space-around',
    },
    amountSelectionButton: {
        backgroundColor: '#01D167',
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center'
    },
    amountValue: {
        color: '#fff',
        textAlign: 'center'
    },
    descriptionText: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Avenir Next',
        marginTop: 20,
        marginHorizontal: 10,
        color: '#22222266'
    },
    separator: {
        width: '90%',
        height: 1,
        backgroundColor: '#ccc',
        alignSelf: 'center'
    }
});
