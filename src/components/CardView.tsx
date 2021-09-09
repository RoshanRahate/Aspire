import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface CardViewProps {
    cardHolderName: String,
    cardNumber: String
    cardValidity: String
    cardCVV: String,
    cardType: String
}

const CardView = ({
    cardHolderName,
    cardNumber,
    cardValidity,
    cardCVV,
    cardType
}) => {
    
    const [hidden, setHidden] = useState(false);
    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                style={styles.hideView}
                onPress={() => {
                    console.log("presed ")
                    setHidden(!hidden)
                }}>
                <View
                    style={styles.hideContentsView}>
                    <Image
                        resizeMode={"contain"}
                        style={styles.eyeImage}
                        source={hidden ? require('../assets/show_eye.png') : require('../assets/eye_closed.png')}
                    >
                    </Image>
                    <Text style={styles.hideText}>Hide card number</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.cardView}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, }}>
                    <Image
                        resizeMode={"contain"}
                        style={styles.logoImage}
                        source={require("../assets/Aspire_Logo.png")}
                    >
                    </Image>
                </View>
                <Text style={styles.cardHolderName}>{cardHolderName}</Text>

                <View style={styles.cardNumberView}>
                    <Text style={styles.cardNumberText}>{hidden ? '****' : cardNumber && cardNumber.slice(0, 4)}</Text>
                    <Text style={styles.cardNumberText}>{hidden ? '****' : cardNumber &&  cardNumber.slice(4, 8)}</Text>
                    <Text style={styles.cardNumberText}>{hidden ? '****' : cardNumber &&  cardNumber.slice(8, 12)}</Text>
                    <Text style={styles.cardNumberText}>{cardNumber &&  cardNumber.slice(12, 16)}</Text>
                </View>
                <View style={styles.expiryAndCVV}>
                    <Text style={styles.cardNumberText}>{`Thru: ${ cardValidity && cardValidity}`}</Text>
                    <Text style={styles.cardNumberText}>{`CVV: ${hidden ? '***' : cardCVV && cardCVV}`}</Text>
                </View>
                <View style={styles.visaImageView}>
                    <Image
                        resizeMode={"contain"}
                        style={styles.visaImage}
                        source={require("../assets/visa_logo.png")} />
                </View>
            </View>
        </View>

    );
};

export default CardView;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '90%',
        alignSelf: 'center',
        // position: 'absolute',
        marginTop: -100
    },
    cardView: {
        backgroundColor: '#01D167',
        width: '100%',
        borderRadius: 15
    },
    logoImage: {
        width: 80,
        height: 50
    },
    hideView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 45,
        bottom: -12
    },
    hideContentsView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12
    },
    eyeImage: { width: 20, height: 20 },
    hideText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#01D167',
        paddingLeft: 10
    },
    aspireText: {
        fontSize: 20,
        fontWeight: '500',
    },
    cardHolderName: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
        color: '#FFFFFF',
        fontFamily: 'Avenir Next'
    },
    cardNumberView: {
        fontSize: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 5
    },
    cardNumberText: {
        letterSpacing: 4,
        fontSize: 15,
        fontWeight: '600',
        marginRight: 20,
        color: '#FFFFFF',
        fontFamily: 'Avenir Next'
    },
    expiryAndCVV: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginTop: 15
    },
    visaImageView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
    },
    visaImage: {
        width: 60,
        height: 40,
        marginBottom: 10
    }
});
