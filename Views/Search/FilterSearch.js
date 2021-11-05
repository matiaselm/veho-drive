import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions, Switch } from 'react-native';
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
import { fi } from 'date-fns/locale'

const FilterSearch = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [length, setLength] = useState(null)
  const [datePickerVisible, setDatePickerVisible] = useState({ starts_at: false, ends_at: false })
  const [initialDate, setInitialDate] = useState(new Date())
  const { manufacturer, model, image, km, year, fuel } = route.params;
  const [car, setCar] = useState({
    manufacturer: manufacturer,
    model: model,
    image: image,
    km: km,
    year: year,
    fuel: fuel
  })
  const [services, setServices] = useState({
    wash: false,
    refuel: false,
    roofrack: false,
    trackday: false
  })
  const [dates, setDates] = useState({
    starts_at: new Date(),
    ends_at: new Date()
  })
  

  useEffect(() => {
    navigation.setOptions({
      title: `${manufacturer} ${model}`
    })
  }, [])

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
    }
  }

  const CarType = ({ fuel }) => {
    if (fuel.includes('e95') && !fuel.includes('hybrid')) {
      return <Text style={{ fontSize: 50, color: '#000' }}>E95</Text>
    }
    if (fuel.includes('diesel')) {
      return <Text style={{ fontSize: 50, color: '#000' }}>Diesel</Text>
    }
    if (fuel.includes('electric')) {
      return <Icon name='lightning-bolt' size={50} color='#000' />
    }
    if (fuel.includes('hybrid')) {
      return <Text style={{ fontSize: 50, color: '#000' }}>Hybrid</Text>
    } else {
      return <></>
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

  return <Container scroll style={styles.container}>
    {image != null && <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: image }}></Image>}

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <View style={styles.infoBody}>
          <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchKm')}</Text><Text style={styles.info}>{km} km</Text>
        </View>
        <View style={styles.infoBody}>
          <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchYear')}</Text><Text style={styles.info}>{year}</Text>
        </View>
        <View style={styles.infoBody}>
          <Text style={{ color: '#000', fontSize: 16 }}>{t('filterSearchFuel')}</Text><Text style={styles.info}>{fuel}</Text>
        </View>
      </View>

      <CarType fuel={fuel} />
    </View>

    <Divider />
    {length != null && <Text style={{ marginHorizontal: 10, fontSize: 20 }}>Sopimuksen kesto: {length}</Text>}
    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>

      <Button
        style={{ flex: 1, marginRight: 5 }}
        icon='calendar'
        text={format(dates.starts_at, 'dd.MM.yyyy')}
        onPress={() => setDatePickerVisible(prev => ({ ...prev, starts_at: true }))}
      />

      <Button
        style={{ flex: 1, marginLeft: 5 }}
        text={format(dates.ends_at, 'dd.MM.yyyy')}
        icon='calendar'
        onPress={() => setDatePickerVisible(prev => ({ ...prev, ends_at: true }))}
      />

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

    <Button
      onPress={() => orderCar(car)}
      text={t('order')}
      icon='car'
      style={{ margin: 10 }}
    />

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

  </Container>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoBody: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2,
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

export default FilterSearch
