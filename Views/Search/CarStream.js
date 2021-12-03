import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import CarInfo from '@/components/CarInfo';
import Container from '@/components/Container';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const CarStream = ({ route, navigation }) => {
    const { cars, initialIndex } = route.params;
    const [currentIndex, setCurrentIndex] = useState(initialIndex ?? null);

    const handleOnChange = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        console.log(currentIndex);
    },[currentIndex])

    // TODO: change to selected car
    return <View style={[StyleSheet.absoluteFill, { position: 'absolute' }]}>
            <SwiperFlatList
                data={cars}
                index={currentIndex ?? 0}
                extraData={cars.length}
                keyExtractor={(item) => item._id}
                onChangeIndex={({ index }) => handleOnChange(index)}
                renderItem={({ item, index }) => {
                    console.log('item', item, index)
                    return <CarInfo car_id={item._id} isCurrent={index === currentIndex}  />
                }}
            />
        </View>
};

export default CarStream;
