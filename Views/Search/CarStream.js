import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import CarInfo from '@/components/CarInfo';
import Container from '@/components/Container';

const CarStream = ({ route, navigation }) => {
    const { car_ids, currentIndex } = route.params;
    const [currentId, setCurrentId] = useState(route.params.current_id ?? null);

    const handleOnChange = (id) => {
        console.log('handleOnChange', id);
        setCurrentId(id);
    };

    // TODO: change to selected car
    return (
        <Container scroll>
            { (Array.isArray(car_ids) && car_ids.length > 0) && car_ids.map((car_id, index) => {
                return <CarInfo key={index} car_id={car_id} isCurrent={currentId === car_id} onChange={() => handleOnChange(car_id, index)} />
            })}
        </Container>
    );
};

export default CarStream;
