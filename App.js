import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
  const [logo, setLogo] = useState(false)
  const { t } = useTranslation();

  const handleOnPress = () => {
    setLogo(!logo)
  }

  return (
    <View style={styles.container}>
      <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={require('./assets/mersu_porvoossa.jpg')}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{ color: '#000', fontSize: 100, textAlign: 'center' }}>:D</Text>
      </TouchableOpacity>
      {logo === true && <Text style={{ color: 'blue', fontSize: 100, textAlign: 'center' }}>{t('appName')}</Text>}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App
