import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';
import AppContext from '@/services/AppContext';
import axios from '@/services/axios';
import { intervalToDuration } from 'date-fns';

const Profile = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { user } = useContext(AppContext);
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscibre = navigation.addListener('focus', () => {
            getOrder()
        })

        return unsubscibre;
    }, [])

    const getOrder = async() => {
        try {
            const response = await axios.get(`users/${user._id}/currentorder`);
            if(response.data) {
                console.log(response.data)
                setOrder(response.data)
                setCar(response.data.car)
                setError(null)
            } else {
                setError(t('order.noOrder'))
                setOrder(null)
                setCar(null)
            }
        } catch(e) {
            console.error(e)
        }
    }

    const getDuration = (end) => {
        const { months, days } = intervalToDuration({start: new Date(), end: new Date(end)})
        if(months > 0) {
            return `${months} Kuukautta ja ${days} päivää`
        } else {
            return `${days} päivää`
        }
    }

    return <Container>
        <View style={styles.container3}>
            <TouchableOpacity style={[styles.container2, { borderRightWidth: 2, }]} onPress={() => navigation.navigate('UserSettings')}>
                <ProfileImage image={ user?.image_url } />
                <Text style={styles.text1}>{ user?.name ?? t('profile.username') }</Text>
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
                { order ? <Text style={styles.text1}>{getDuration(order.ends_at)}</Text> : <Text style={styles.text1}>{t('profile.noOrder')}</Text> }
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
