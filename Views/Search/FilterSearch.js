import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

const FilterSearch = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { manufacturer, model, image, km, year, fuel } = route.params;

  return <ScrollView style={styles.container}>
    {image != null && <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: image }}></Image>}
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', margin: 10 }}>
      <Text style={{ color: '#000', fontSize: 32, textAlign: 'center' }}>{manufacturer}</Text>
      <Text style={{ color: '#000', fontSize: 32, textAlign: 'center' }}>{model}</Text>
    </View>
    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', margin: 10 }}>
      <View style={styles.infoBody}>
        <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchKm')}</Text><Text style={styles.info}>{km}km</Text>
      </View>
      <View style={styles.infoBody}>
        <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchYear')}</Text><Text style={styles.info}>{year}</Text>
      </View>
      <View style={styles.infoBody}>
        <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchFuel')}</Text><Text style={styles.info}>{fuel}</Text>
      </View>
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoBody: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2.5,
    justifyContent: 'space-between'
  },
  info: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default FilterSearch
