import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Box from '@/components/Box';
import Container from '@/components/Container';
import database from '@/services/database';

const Feed = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [cars, setCars] = useState(null);

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

  return <Container>
    <FlatList
      style={styles.container}
      numColumns={3}
      data={cars}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) =>
        <Box
          imageUrl={item.image}
          title={`${item.manufacturer} ${item.model}`}
          onPress={() => handleOnPress(item)}
          style={styles.box} />
      }>
    </FlatList>
  </Container>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: (Dimensions.get('window').width) / 3,
    aspectRatio: 1,
    minHeight: 200,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff'
  }
});

export default Feed
