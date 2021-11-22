import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, PanResponder } from 'react-native';
import Text from '@/components/Text';
import Container from '@/components/Container';

const CarStream = ({ route, navigation }) => {
    const { car_ids } = route.params;
    const [currentCarId, setCurrentCarId] = useState(null);
    const panResponderRef = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
        })
    ).current;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(Array.isArray(car_ids)) {
                setCurrentCarId(car_ids[0]);
            }
        });

        return unsubscribe
    })
    return (
        <Container padding>
            <View { ...panResponderRef.panHandlers}></View>

        </Container>
    );
};

export default CarStream;
