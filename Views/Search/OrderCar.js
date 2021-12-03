import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Pressable, ScrollView, Dimensions, Switch } from 'react-native';
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

const OrderCar = ({car_id}) => {
    const { t } = useTranslation();
    const [length, setLength] = useState(null)
    const [datePickerVisible, setDatePickerVisible] = useState({ starts_at: false, ends_at: false })
    const [initialDate, setInitialDate] = useState(new Date())
    const [car, setCar] = useState(null)
    const [services, setServices] = useState({
      wash: false,
      refuel: false,
      roofrack: false,
    })
    const [dates, setDates] = useState({
      starts_at: new Date(),
      ends_at: new Date()
    })
  
    useEffect(() => {
      getCar(car_id)
    }, [])
  
    const getCar = async (car_id) => {
      try {
        const response = await axios.get(`cars/${car_id}`)
        setCar(response.data)
      } catch (e) {
        console.error(e)
      }
    }
  
    const orderCar = async (car) => {
      try {
        if ((dates.starts_at < dates.ends_at) && dates.starts_at >= initialDate) {
          const order = {
            car: car,
            services: services,
            starts_at: dates.starts_at,
            ends_at: dates.ends_at
          }
          await AsyncStorage.setItem('order', JSON.stringify(order))
          Toast.show(`${car.manufacturer} ${car.model} asetettu tilaukseen!`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: COLORS.TERTIARY,
            textColor: '#fff'
          })
        } else {
          Toast.show(`Valitse sopivat päivämäärät`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: COLORS.TERTIARY,
            textColor: '#fff'
          })
        }
  
      } catch (error) {
        console.error(error)
        // Virhe toast
      }
    }
  
    const handleOnValueChangeService = (bool, key) => {
      let _s = services
      services[key] = bool
      setServices({ ..._s })
    }
  
    const handleDateChange = (mode, date) => {
      try {
        if (typeof date != 'undefined') {
          setDatePickerVisible({ starts_at: false, ends_at: false })
          if (mode === 'ends_at') {
            setDates(prev => ({ ...prev, ends_at: new Date(date) }))
          }
          if (mode === 'starts_at') {
            setDates(prev => ({ ...prev, starts_at: new Date(date) }))
          }
          setLength(formatDistance(dates.starts_at, dates.ends_at, { locale: fi }))
        }
      } catch (e) {
        console.error(e)
        setDatePickerVisible({ starts_at: false, ends_at: false })
      }
    }
    return <View>
    <Divider />
    {length != null && <Text style={{ marginHorizontal: 10, fontSize: 20 }}>Sopimuksen kesto: {length}</Text>}
    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
      <View style={{ flex: 1, marginRight: 5, flexDirection: 'column' }}>
        <Text subtitle style={{ alignSelf: 'center' }}>Laina alkaa</Text>
        <Button
          style={{ width: '100%' }}
          icon='calendar'
          text={format(dates.starts_at, 'dd.MM.yyyy')}
          onPress={() => setDatePickerVisible(prev => ({ ...prev, starts_at: true }))}
        />
      </View>

      <View style={{ flex: 1, marginLeft: 5, flexDirection: 'column' }}>
        <Text subtitle style={{ alignSelf: 'center' }}>Laina päättyy</Text>
        <Button
          style={{ width: '100%' }}
          text={format(dates.ends_at, 'dd.MM.yyyy')}
          icon='calendar'
          onPress={() => setDatePickerVisible(prev => ({ ...prev, ends_at: true }))}
        />
      </View>

    </View>

    <Divider />

    <View style={{ padding: 10, width: Dimensions.get('window').width / 2 }}>
      {services != null && Object.keys(services).map(key => {
        return <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>{t(`${key}Service`)}</Text>
          <Switch onValueChange={bool => handleOnValueChangeService(bool, key)} value={services[key]} thumbColor={COLORS.PRIMARY} trackColor={{ true: COLORS.PRIMARY_DARK, false: COLORS.PLATINUM }} />
        </View>
      })}
    </View>

    <View style={{ flexDirection: 'row', margin: 10 }}>
      <Button
        onPress={() => orderCar(car)}
        text={t('order.createOrder')}
        icon='car'
        style={{ flex: 1.5 }}
      />

    </View>


    {datePickerVisible.starts_at == true &&
      <DateTimePicker
        value={dates.starts_at}
        mode='date'
        onChange={(event, date) => handleDateChange('starts_at', date)}
      />}

    {datePickerVisible.ends_at == true &&
      <DateTimePicker
        value={dates.ends_at}
        mode='date'
        onChange={(event, date) => handleDateChange('ends_at', date)}
      />}
      </View>
}

export default OrderCar;
