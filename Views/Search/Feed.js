import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, View, RefreshControl, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Box from '@/components/Box';
import Container from '@/components/Container';
import axios from '@/services/axios';
import Text from '@/components/Text';
import CarInfo from '@/components/CarInfo';
import Button from '@/components/Button';
import Carousel from 'react-native-snap-carousel';

const Feed = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(null);
  const [refreshing, setRefreshing] = useState(false)
  const [isSwiperVisble, setIsSwiperVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(false);

  const handleOnChange = (index) => {
      setCurrentIndex(index);
  };

  useEffect(() => {
    getCars()
  },[])

  const handleOnPress = (car_id) => {
    setCurrentIndex(cars.map(c => c._id).indexOf(car_id))
    setIsSwiperVisible(true)
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

  const onSelectCar = (car_id) => {
    navigation.navigate('OrderCar', { car_id })
  }

  const onClose = () => {
    console.log('onClose')
    setIsSwiperVisible(false)
  }

  useEffect(() => {
    console.log(currentIndex)
  },[currentIndex])

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

    {isSwiperVisble &&
      <TouchableOpacity touchSoundDisabled={true} activeOpacity={1} onPress={onClose} style={[{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 40 }, StyleSheet.absoluteFill ]}>
        <Carousel
          data={cars}
          windowSize={3}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width / 1.2}
          renderItem={({ item, index }) => {
            return <CarInfo car={item} isCurrent={index === currentIndex} onPress={() => onSelectCar(item._id)} onClose={onClose} />
          }}
        />
      </TouchableOpacity>
    }

    {isSwiperVisble && <Button style={{ width: Dimensions.get('window').width / 1.2, alignSelf: 'center', marginBottom: 20 }} onPress={() => navigation.navigate('OrderCar')}>Tilaa</Button>}
  
  </Container>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height
  },
});

export default Feed
