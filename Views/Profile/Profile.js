import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';

const Profile = ({ navigation, route }) => {
    const { t } = useTranslation();
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscibre = navigation.addListener('focus', () => {
            getOrder()
        })

        return unsubscibre;
    }, [])

    const getOrder = async() => {
        try {
            let res = await AsyncStorage.getItem('order')
            res = JSON.parse(res)
            if(res) {
                setOrder(res)
                setCar(res.car)
            } else {
                setError(t('order.noOrder'))
            }
        } catch(e) {
            console.error(e)
        }
    }

    return <Container>
        <View style={styles.container3}>
            <TouchableOpacity style={[styles.container2, { borderRightWidth: 2, }]} onPress={() => navigation.navigate('UserSettings')} activeOpacity={0.8}>
                <ProfileImage image={ user?.image_url } />
                <Text style={styles.text1}>Jarmo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('Bonus')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/bonus_sininen.png')}></Image>
                <Text style={styles.text1}>Bonustaso</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container3}>
            <TouchableOpacity style={[styles.container2, { borderRightWidth: 2, }]} onPress={() => navigation.navigate('Veho')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/veho_logo.png')}></Image>
                <Text style={styles.text1}>Yhteystiedot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('CarStack', { screen: 'Order'})}>
                { car && <Image style={styles.image} resizeMode='contain' source={{ uri: car.image_url }}></Image> }
                <Text style={styles.text1}>{ error ?? 'Tilaus' }</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container3}>
            <TouchableOpacity style={[styles.container2, { borderRightWidth: 2, }]} onPress={() => navigation.navigate('Warnings')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/settings_sininen.png')}></Image>
                <Text style={styles.text1}>Huolto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container2} onPress={() => navigation.navigate('OrderHistory')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/membership_sininen.png')}></Image>
                <Text style={[styles.text1, { fontSize: 17, }]}>Menneet tapahtumat</Text>
            </TouchableOpacity>
        </View>
    </Container>
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 2,
        flexDirection: 'column',
    },
    container3: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    text1: {
        color: '#000',
        fontSize: 26,
    },
    image: {
        flex: 1,
        width: '100%',
    }
});

export default Profile
