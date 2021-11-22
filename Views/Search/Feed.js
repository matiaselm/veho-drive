import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, View, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import Box from '@/components/Box';
import Container from '@/components/Container';
import database from '@/services/database';
import axios from '@/services/axios';

const Feed = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(null);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getCars()
  },[])

  const handleOnPress = (car_id) => {
    const car_ids = cars.map(car => car._id)
    const currentIndex = car_ids.indexOf(car_id)
    navigation.navigate('CarStream', { car_ids: car_ids, currentIndex: currentIndex, current_id: car_id })
  }

  const getCars = async () => {
    try {
      const res = await axios.get('cars')
      setCars(res.data)
    } catch (e) {
      console.error('axios', e)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      getCars()
    } catch(e) {
      console.error(e)
    }
    setRefreshing(false)
  }

  return <Container>
    <FlatList
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}
      style={styles.container}
      numColumns={3}
      data={cars}
      keyExtractor={(_, index) => index}
      renderItem={({ item, index }) =>{
        return <Box
          imageUrl={item.image_url}
          title={`${item.manufacturer} ${item.model}`}
          subtitle={`${item.monthly_price}€/kk`}
          additional={`${item.fueltype}`}
          onPress={() => handleOnPress(item._id, index)}
        />}
      }>
    </FlatList>
  </Container>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
  },
});

export default Feed
