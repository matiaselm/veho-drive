import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Container from '@/components/Container';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { COLORS } from '@/styles/constants';
import Divider from '@/components/Divider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDistance, format } from 'date-fns';
import { fi } from 'date-fns/locale';
import Text from '@/components/Text';
import axios from '@/services/axios';

const CarInfo = ({ car, car_id, isCurrent, willLoad, onPress, style, onClose }) => {
  const { t } = useTranslation();

  return car && <View style={styles.body}>
    {car.image_url && <ImageBackground style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: car.image_url }}>
      <Text title style={{ textAlign: 'center' }}>{car.manufacturer} {car.model}</Text>
    </ImageBackground>}

    <View style={{ margin: 10 }}>
      <View style={styles.infoBody}>
        <Text>{t('filterSearchKm')}</Text><Text style={styles.info}>{car.km} km</Text>
      </View>
      <View style={styles.infoBody}>
        <Text>{t('filterSearchYear')}</Text><Text style={styles.info}>{car.year}</Text>
      </View>
      <View style={styles.infoBody}>
        <Text>{t('filterSearchFuel')}</Text><Text style={styles.info}>{car.fueltype}</Text>
      </View>

      <Text style={{ textAlign: 'right' }} fontSize={40}>{car.monthly_price}€/kk</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  body: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height / 1.5
  },
  infoBody: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default CarInfo
