import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './Profile';
import Warnings from './Warnings';
import Bonus from './Bonus';
import Veho from './Veho';
import OrderHistory from './OrderHistory';
import UserSettings from './UserSettings';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={options} />
      <Stack.Screen name="Warnings" component={Warnings} options={options} />
      <Stack.Screen name="Bonus" component={Bonus} options={options} />
      <Stack.Screen name="Veho" component={Veho} options={options} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} options={options} />
      <Stack.Screen name="UserSettings" component={UserSettings} options={options} />
    </Stack.Navigator>
  );
};