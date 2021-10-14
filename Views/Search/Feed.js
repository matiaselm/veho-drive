import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const Feed = ({ title, navigation, route }) => {
    const { t } = useTranslation();

    const handleOnPress = () => {
      navigation.navigate('Filtterit')
    }

    return <ScrollView style={styles.container}>
      <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={require('../../assets/mersu_porvoossa.jpg')}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={{ color: '#000', fontSize: 26, textAlign: 'center' }}>Siirry toiseen näkymään</Text>
      </TouchableOpacity>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Feed
