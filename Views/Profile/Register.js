import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Container from '@/components/Container';
import axios from '@/services/axios';
import Toast from 'react-native-root-toast';
import AppContext from '@/services/AppContext';

const Register = ({ route, navigation }) => {
    const { user, setUser } = useContext(AppContext);
    const [localUser, setLocalUser] = useState(user);

    const onSubmit = async () => {
        try {
            const res = await axios.post('users', user);
            if(res) Toast.show('Käyttäjä luotu onnistuneesti!');
            setUser(res.data);
        } catch(e) {
            console.error(e)
        }
    }

    return <Container>
        <Text>Nimi</Text>
        <TextInput placeholder='Nimi' style={styles.input} value={localUser.name} onChangeText={text => setLocalUser({ ...localUser, name: text })} />
        <Text>Linkki profiilikuvaan</Text>
        <TextInput placeholder='Profiilikuva' style={styles.input} value={localUser.image_url} onChangeText={url => setLocalUser({ ...localUser, image_url: url })} />
        <Button onPress={onSubmit}>Tallenna</Button>
    </Container>
}

export default Register;
