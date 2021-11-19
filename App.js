import React from 'react';
import { LogBox, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Main from './views/Main';
import { RootSiblingParent } from 'react-native-root-siblings';
import './services/axios';
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

// kutsutaan vain jotta saadaan firebase sekä i18n alustettua
import './services/i18n';
import './services/firebase';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {

  let [fontsLoaded] = useFonts({
    'OpenSans_light': OpenSans_300Light,
    'OpenSans_bold': OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (<RootSiblingParent>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
      <StatusBar style="auto" />
    </RootSiblingParent>
    );
  }
};

export default App
