import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';


const FilterSearch = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { manufacturer, model, image } = route.params;

  return <ScrollView style={styles.container}>
    {image != null && <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: image }}></Image>}
    <Text style={{ color: '#000', fontSize: 64, textAlign: 'center' }}>{manufacturer} {model}</Text>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default FilterSearch
