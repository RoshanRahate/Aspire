import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import DebitCardScreen from '../screens/DebitCardScreen';
import SettingsScreen from '../screens/ProfileScreen';
import SpendingLimitScreen from '../screens/SpendingLimit';
import { AVAILABLE_ROUTES } from '../utility/Constants';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DebitStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === AVAILABLE_ROUTES.DEBIT_CARD) {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === AVAILABLE_ROUTES.PROFILE) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#01D167',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen name={AVAILABLE_ROUTES.DEBIT_CARD} options={{ headerShown: false }} component={DebitCardScreen} />
      <Tab.Screen name={AVAILABLE_ROUTES.PROFILE} options={{ headerShown: false }} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={AVAILABLE_ROUTES.HOME} options={{ headerShown: false }} component={DebitStack} />
      <Stack.Screen name={AVAILABLE_ROUTES.SPENDING_LIMIT_SCREEN} options={{ headerShown: false }} component={SpendingLimitScreen} />
    </Stack.Navigator>
  </NavigationContainer>

);

RootNavigator.displayName = 'RootNavigator';
