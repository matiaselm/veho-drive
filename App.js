import React from 'react';
import { LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Main from './views/Main';
import { RootSiblingParent } from 'react-native-root-siblings';

// kutsutaan vain jotta saadaan firebase sekä i18n alustettua
import './services/i18n';
import './services/firebase';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  return (<RootSiblingParent>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    <StatusBar style="auto" />
    </RootSiblingParent>
  );
};

export default App
