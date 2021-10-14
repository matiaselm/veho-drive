import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

const Feed = ({ title, navigation, route }) => {
    const { t } = useTranslation();
    const [ data, setData ] = useState([]);

    useEffect(() => {
      const d = [
        {id: 0, name: 'Smart Fortwo'},
        {id: 1, name: 'Smart ForThree'},
        {id: 2, name: 'Mercedes Benz 1'},
        {id: 3, name: 'Mercedes Benz 2'},
        {id: 4, name: 'Mercedes Benz 3'},
        {id: 5, name: 'Mercedes Benz 4'},
        {id: 6, name: 'Mercedes Benz 5'},
        {id: 7, name: 'Mercedes Benz 6'},
        {id: 8, name: 'Mercedes Benz 7'},
        {id: 9, name: 'Mercedes Benz 8'},
        {id: 10, name: 'Mercedes Benz 9'},
      ]

      setData(d.slice())
    },[])

    const handleOnPress = () => {
      navigation.navigate('Filtterit')
    }

  return <View style={styles.container}>
    <FlatList
      data={data}
      extraData={data}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
      renderItem={({ item, index, separators }) => (
        <View key={item.id} style={{ width: '50%', height: 300, margin: 10, flexDirection: 'column' }}>
          <Text>{item.name}</Text>
          <Image source={{ uri: 'http://placeimg.com/500/500/nature'}} style={{ height: 200, flex: 1 }} resizeMode='contain' />
        </View>
      )}
    />
  </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Feed
