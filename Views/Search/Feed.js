import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, View, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import Box from '@/components/Box';
import Container from '@/components/Container';
import database from '@/services/database';

const Feed = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(null);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getCars()
  },[])

  const handleOnPress = (item) => {
    navigation.navigate('FilterSearch', item)
  }

  const getCars = async () => {
    try {
      const res = await database.get('cars')
      setCars(res.data)
    } catch (e) {
      console.error(e)
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
          imageUrl={item.image}
          title={`${item.manufacturer} ${item.model}`}
          subtitle={`${item.year}`}
          additional={`${item.fuel}`}
          onPress={() => handleOnPress(item)}
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
