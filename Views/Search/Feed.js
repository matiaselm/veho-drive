import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import Box from '@/components/Box';
import Container from '@/components/Container';
import axios from '@/services/axios';

const Feed = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      getCars()
    })
    
    return listener;
  },[navigation])

  const handleOnPress = (car_id) => {
    navigation.navigate('OrderCar', { car_id: car_id })
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
      renderItem={({ item, index }) => {
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
