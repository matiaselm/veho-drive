import React, { useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '@/services/AppContext';
import axios from '@/services/axios';

import './services/i18n';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  const [user, setUser] = React.useState(null);
  const [isOrderActive, setIsOrderActive] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(JSON.parse(user)) {
        setUser(JSON.parse(user));
      } else {
        axios.post('users', { name: null }).then(res => {
          setUser(res.data);
        }).catch(err => {
          console.error('createuser', err)
        })
      }
    })
  }, [])

  useEffect(() => {
    if(user) {
      console.log(JSON.stringify(user, '', '\t'))
      AsyncStorage.setItem('user', JSON.stringify(user));
  
      axios.get('users/' + user._id + '/currentorder').then(res => {
        console.log(res.data)
        setIsOrderActive(Object.keys(res.data)?.length > 0);
      }).catch(err => {
        console.error('getcurrentorder', err)
      })
    }

  },[user])

  const appContextProvider = React.useMemo(() => ({
    setUser: setUser,
    user: user,
    isOrderActive: isOrderActive,
    setIsOrderActive: setIsOrderActive
  }), [user, isOrderActive]);

  let [fontsLoaded] = useFonts({
    'OpenSans_light': OpenSans_300Light,
    'OpenSans_bold': OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (<RootSiblingParent>
      <AppContext.Provider value={appContextProvider}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
        <StatusBar style="auto" />
      </AppContext.Provider>
    </RootSiblingParent>
    );
  }
};

export default App
