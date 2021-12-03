import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './Feed';
import OrderCar from './OrderCar';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} options={{ ...options, name: 'feed' }} />
      <Stack.Screen name="OrderCar" component={OrderCar} options={{ ...options, name: 'orderCar' }} />
    </Stack.Navigator>
  );
};