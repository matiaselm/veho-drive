import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Order from './Order';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Order" component={Order} options={options} />
    </Stack.Navigator>
  );
};