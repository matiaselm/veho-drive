import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import Container from '@/components/Container';
import ProfileImage from '@/components/ProfileImage';

const Settings = ({ route, navigation }) => {

    return (
        <Container padding>
            <View style={{ flexDirection: 'row' }}>
                <ProfileImage />
                <Text title style={{ marginLeft: 20 }}>Matti Koskinen</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CarStack',{ screen: 'Order' })}><Text title style={{ marginTop: 10 }}>Hallitse tilausta</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Vaihda kieli')}><Text title style={{ marginTop: 10 }}>Vaihda kieli</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Ilmoita ongelmasta')}><Text title style={{ marginTop: 10 }}>Ilmoita ongelmasta</Text></TouchableOpacity>
        </Container>
    )
}

export default Settings