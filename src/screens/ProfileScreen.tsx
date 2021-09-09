import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ProfileScreenProps {}

const ProfileScreen = (props: ProfileScreenProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile in progress!</Text>
  </View>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {}
});
