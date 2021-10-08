import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const FilterSearch = ({ title, navigation, route }) => {
    const [logo, setLogo] = useState(false)
    const { t } = useTranslation();

    const handleOnPress = () => {
      setLogo(!logo)
    }

    return <ScrollView style={styles.container}>
      <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={require('../../assets/mersu_porvoossa.jpg')}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{ color: '#000', fontSize: 64, textAlign: 'center' }}>:D</Text>
      </TouchableOpacity>
      {logo === true && <Text style={{ color: 'blue', fontSize: 64, textAlign: 'center' }}>{t('appName')}</Text>}
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default FilterSearch
