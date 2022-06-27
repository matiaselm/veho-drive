import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';
import AppContext from '@/services/AppContext';
import axios from '@/services/axios';
import { intervalToDuration } from 'date-fns';

const Profile = ({ navigation, route }) => {
    const { t }             = useTranslation();
    const { user }          = useContext(AppContext);
    const [car, setCar]     = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const [dimensions] = useState({
        width:  Dimensions.get('window').width,
        height: Dimensions.get('window').height
    });

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
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('UserSettings')}>
                <ProfileImage image={ user?.image_url } />
                <Text style={styles.text}>{ user?.name ?? t('profile.username') }</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('Bonus')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/bonus_sininen.png')} />
                <Text style={styles.text}>Bonustaso</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('Veho')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/veho_logo.png')} />
                <Text style={styles.text}>Yhteystiedot</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('CarStack', { screen: 'Order'})}>
                { car && <Image style={styles.carImage} resizeMode='contain' source={{ uri: car.image_url }} /> }
                { order ? <Text style={styles.text}>{getDuration(order.ends_at)}</Text> : <Text style={styles.text}>{t('profile.noOrder')}</Text> }
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('Warnings')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/settings_sininen.png')} />
                <Text style={styles.text}>Huolto</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={[styles.containerItem]} onPress={() => navigation.navigate('OrderHistory')}>
                <Image style={styles.image} resizeMode='contain' source={require('@/assets/icons/membership_sininen.png')} />
                <Text style={[styles.text, { fontSize: 17, }]}>Menneet tapahtumat</Text>
            </TouchableOpacity>
        </View>
    </Container>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    text: {
        position: 'absolute',
        bottom: 0,
        color: '#000',
        fontSize: 26,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        width: '70%',
        margin: 20,
    },
    carImage: {
        flex: 1,
        width: '90%',
        borderRadius: 10,
    }
});

export default Profile
