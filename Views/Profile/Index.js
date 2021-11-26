import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './Profile';
import Warnings from './Warnings';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={options} />
      <Stack.Screen name="Warnings" component={Warnings} options={options} />
    </Stack.Navigator>
  );
};