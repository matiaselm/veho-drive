import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { collection, addDoc } from "firebase/firestore";

const Settings = ({ title }) => {

    return (
        <View>
            <Text>{title}</Text>
            <TouchableOpacity><Text>lmao</Text></TouchableOpacity>
        </View>
    )
}

export default Settings