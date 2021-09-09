import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import DebitCardScreen from '../screens/DebitCardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SpendingLimitScreen from '../screens/SpendingLimit';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DebitStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="DebitScreen" component={DebitCardScreen} />
        <Stack.Screen options={{headerShown: false}} name="SpendingLimitScreen" component={SpendingLimitScreen} />
      </Stack.Navigator>
    );
  }
  

export const RootNavigator = () => (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'card'
              : 'card-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
        <Tab.Screen name="Home" options={{headerShown: false}} component={DebitStack} />

      <Tab.Screen name="DebitCard"  options={{headerShown: false}} component={DebitStack} />
      <Tab.Screen name="Settings" options={{headerShown: false}} component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>

);

RootNavigator.displayName = 'RootNavigator';
