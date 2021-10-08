import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Order = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default Order