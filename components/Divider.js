import React from 'react';
import { View } from 'react-native';

const Divider = ({ color }) => {
    return <View style={{ width: '95%', borderWidth: 1, borderColor: color ?? '#aaa', margin: 5, alignSelf: 'center' }}></View>
}

export default Divider;
