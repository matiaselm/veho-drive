import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from './Settings';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={options} />
    </Stack.Navigator>
  );
};