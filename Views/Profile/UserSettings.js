import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import Container from '@/components/Container';
import ProfileImage from '@/components/ProfileImage';

const UserSettings = ({ route, navigation }) => {

    return (
        <Container padding>
            <ProfileImage onPress={() => console.log('vaihda profiilikuva')} icon='pencil' activeOpacity={0.8}/>
            <TouchableOpacity onPress={() => console.log('Vaihda kieli')}><Text title style={{ marginTop: 10 }}>Vaihda kieli</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Ilmoita ongelmasta')}><Text title style={{ marginTop: 10 }}>Ilmoita ongelmasta</Text></TouchableOpacity>
        </Container>
    )
}

export default UserSettings