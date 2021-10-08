import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './Feed';
import FilterSearch from './FilterSearch';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
};

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} options={options} />
      <Stack.Screen name="FilterSearch" component={FilterSearch} options={options} />
    </Stack.Navigator>
  );
};