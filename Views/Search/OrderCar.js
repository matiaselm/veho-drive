import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, Switch, StyleSheet, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { COLORS } from '@/styles/constants';
import Divider from '@/components/Divider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDistance, format, formatDistanceStrict, intervalToDuration } from 'date-fns';
import { fi } from 'date-fns/locale';
import Text from '@/components/Text';
import axios from '@/services/axios';
import AppContext from '@/services/AppContext';

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

const OrderCar = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { user, isOrderActive } = useContext(AppContext);
  const [length, setLength] = useState(null)
  const [datePickerVisible, setDatePickerVisible] = useState({ starts_at: false, ends_at: false })
  const [initialDate] = useState(new Date())
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
  const [price, setPrice] = useState(car?.monthly_price ?? 0)

  const { car_id } = route.params;

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      getCar(car_id);
    });

    return listener;
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
          starts_at: dates.starts_at.toISOString(),
          ends_at: dates.ends_at.toISOString(),
          user: user._id,
          car: car._id
        }
        console.log(order);
        const response = await axios.post('orders', order);
        if (response) {
          Toast.show(`${car.manufacturer} ${car.model} asetettu tilaukseen!`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: COLORS.TERTIARY,
            textColor: '#fff'
          })
        }
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
      if (date) {
        setDatePickerVisible({ starts_at: false, ends_at: false })
        if (mode === 'ends_at') {
          setDates(prev => ({ ...prev, ends_at: new Date(date) }))
        }
        if (mode === 'starts_at') {
          setDates(prev => ({ ...prev, starts_at: new Date(date) }))
        }
      }
    } catch (e) {
      console.error(e)
      setDatePickerVisible({ starts_at: false, ends_at: false })
    }
  }

  useEffect(() => {
    if (dates && car) {
      const { days, months } = intervalToDuration({ start: dates.starts_at, end: dates.ends_at })
      const { monthly_price } = car;
      const daily_price = monthly_price / 30;
      const _price = (months * monthly_price) + (daily_price * days);
      setPrice(Math.round(_price));
      setLength(formatDistanceStrict(dates.starts_at, dates.ends_at, { locale: fi, unit: 'day' }));
    }
  }, [dates, car])

  return (
    <ScrollView>
      {car ? <View>{car.image_url && <ImageBackground style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: car.image_url }}>
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
      </View> : <ActivityIndicator size='large' color={COLORS.PRIMARY} />}

      {!isOrderActive ? <View>
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

        {price != null && <Text style={{ fontSize: 40, textAlign: 'center' }}>{t('orderCar.price', { count: price })}</Text>}

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Button
            onPress={() => orderCar(car)}
            icon='car'
            style={{ flex: 1.5 }}
          >{t('order.createOrder')}</Button>
        </View>

        {datePickerVisible.starts_at == true && <DateTimePicker
          value={dates.starts_at}
          mode='date'
          onChange={(event, date) => handleDateChange('starts_at', date)}
        />}

        {datePickerVisible.ends_at == true && <DateTimePicker
          value={dates.ends_at}
          mode='date'
          onChange={(event, date) => handleDateChange('ends_at', date)}
        />}

      </View> : <Text style={{ fontSize: 20, textAlign: 'center' }}>Sinulla on tilaus voimassa. Lopetathan sen ennen uusien luontia</Text>}
    </ScrollView>
  )
}

export default OrderCar;
