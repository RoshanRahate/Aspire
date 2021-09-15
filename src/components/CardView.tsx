import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from '../utility/Constants';
import eyeOpenedImage from '../assets/eye_open.png';
import eyeClosedImage from '../assets/eye_closed.png';
import AspireLogo from '../assets/Aspire_Logo.png';
import VisaLogo from '../assets/visa_logo.png';

interface CardViewProps {
  cardHolderName: String;
  cardNumber: String;
  cardValidity: String;
  cardCVV: String;
  cardType: String;
}

/**
 * This component returns the CardView JSX with the details provided by the props
 * @param props
 * cardHolderName: String;
 * cardNumber: String;
 * cardValidity: String;
 * cardCVV: String;
 * cardType: String;
 * @returns JSX
 */
const CardView = (props: CardViewProps) => {
  const [hidden, setHidden] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.hideView}
        onPress={() => setHidden(prevState => !prevState)}>
        <View style={styles.hideContentsView}>
          <Image
            resizeMode="contain"
            style={styles.eyeImage}
            source={hidden ? eyeOpenedImage : eyeClosedImage}
          />
          <Text style={styles.hideText}>
            {hidden ? Constants.show_card_number : Constants.hide_card_number}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.cardView}>
        <View style={styles.aspireLogoWrapper}>
          <Image
            resizeMode={'contain'}
            style={styles.logoImage}
            source={AspireLogo}
          />
        </View>
        <Text style={styles.cardHolderName}>{props.cardHolderName}</Text>

        <View style={styles.cardNumberView}>
          <Text style={styles.cardNumberText}>
            {hidden ? '****' : props.cardNumber?.slice(0, 4)}
          </Text>
          <Text style={styles.cardNumberText}>
            {hidden ? '****' : props.cardNumber?.slice(4, 8)}
          </Text>
          <Text style={styles.cardNumberText}>
            {hidden ? '****' : props.cardNumber?.slice(8, 12)}
          </Text>
          <Text style={styles.cardNumberText}>
            {props.cardNumber?.slice(12, 16)}
          </Text>
        </View>
        <View style={styles.expiryAndCVV}>
          <Text style={styles.cardNumberText}>
            {props.cardValidity && `Thru: ${props.cardValidity}`}
          </Text>
          <Text style={styles.cardNumberText}>
            {props.cardCVV && `CVV: ${hidden ? '***' : props.cardCVV}`}
          </Text>
        </View>
        <View style={styles.visaImageView}>
          <Image
            resizeMode="contain"
            style={styles.visaImage}
            source={VisaLogo}
          />
        </View>
      </View>
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    // @TODO
    marginTop: 150, //windowHeight * 0.21//140
  },
  cardView: {
    backgroundColor: '#01D167',
    width: '100%',
    borderRadius: 15,
  },
  aspireLogoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  hideView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 10,
    height: 45,
    // @TODO
    bottom: -12,
    marginRight: 1,
  },
  hideContentsView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  eyeImage: {
    width: 22,
    height: 22,
  },
  hideText: {
    fontWeight: 'bold',
    color: '#01D167',
    fontSize: 13,
    paddingLeft: 10,
  },
  cardHolderName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    fontSize: 22,
    fontFamily: 'Avenir Next',
  },
  cardNumberView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  cardNumberText: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 4,
    fontSize: 15,
    marginRight: 20,
    fontFamily: 'Avenir Next',
  },
  expiryAndCVV: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginTop: 15,
  },
  visaImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  visaImage: {
    width: 60,
    height: 40,
    marginBottom: 10,
  },
});
