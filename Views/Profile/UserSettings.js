import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Container from '@/components/Container';
import ProfileImage from '@/components/ProfileImage';
import AppContext from '@/services/AppContext';
import axios from '@/services/axios';

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff', 
        height: 40,
        borderRadius: 10,
        paddingStart: 10,
        fontFamily: 'OpenSans_light',
        color: '#000'
    }
})

const UserSettings = ({ route, navigation }) => {
    const { user, setUser }  = useContext(AppContext);
    const [localUser, setLocalUser] = useState(user);

    const onSubmit = () => {
        setUser(localUser);
        axios.put('/users/' + localUser._id, localUser).then(res => {
            console.log(res.data);
            navigation.goBack();
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        <Container padding>
            <ProfileImage image={localUser.image_url} />
            <Text bold>Nimi</Text>
            <TextInput placeholder='Nimi' style={styles.input} value={localUser.name} onChangeText={text => setLocalUser({ ...localUser, name: text })} />
            <Text>ID: {user._id}</Text>
            <Text bold>Profiilikuvan url</Text>
            <TextInput placeholder='URL' style={styles.input} value={localUser.image_url} onChangeText={url => setLocalUser({ ...localUser, image_url: url })} />
            <Button onPress={onSubmit}>Tallenna</Button>
            <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={() => navigation.navigate('Warnings')}><Text title >Ilmoita ongelmasta</Text></TouchableOpacity>
        </Container>
    )
}

export default UserSettings