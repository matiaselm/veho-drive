import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {  
  const { t } = useTranslation();
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const Home = (props) => {
    const [logo, setLogo] = useState(false)

    const handleOnPress = () => {
      setLogo(!logo)
    }

    return <View style={styles.container}>
      <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={require('./assets/mersu_porvoossa.jpg')}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{ color: '#000', fontSize: 100, textAlign: 'center' }}>:D</Text>
      </TouchableOpacity>
      {logo === true && <Text style={{ color: 'blue', fontSize: 100, textAlign: 'center' }}>{t('appName')}</Text>}
      <StatusBar style="auto" />
    </View>
  }

  const Second = () => {
    const [logo, setLogo] = useState(false)

    const handleOnPress = () => {
      setLogo(!logo)
    }

    return <View style={styles.container}>
      <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={require('./assets/mersu_porvoossa.jpg')}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{ color: '#000', fontSize: 100, textAlign: 'center' }}>:(</Text>
      </TouchableOpacity>
      {logo === true && <Text style={{ color: 'blue', fontSize: 100, textAlign: 'center' }}>{t('appName')}</Text>}
      <StatusBar style="auto" />
    </View>
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Second" component={Second} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App
