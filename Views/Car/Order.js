import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '@/components/Container';
import Divider from '@/components/Divider';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns'; 
import { fi } from 'date-fns/locale'
import Button from '@/components/Button';
import Text from '@/components/Text';
import axios from '@/services/axios';
import { COLORS } from '@/styles/constants';

import AppContext from '@/services/AppContext';

const Order = ({ navigation, route }) => {
    const { user } = useContext(AppContext);
    const [ car, setCar ] = useState(null)
    const [ order, setOrder ] = useState(null)
    const [ services, setServices ] = useState(null)
    const [ error, setError ] = useState(null)
    const { t } = useTranslation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('focus')
            getOrder()
        })
        
        return unsubscribe;
    },[navigation])

    const getOrder = async () => {
        try {
            const response = await axios.get(`users/${user._id}/currentorder`)
            if(response.data) {
                setOrder(response.data)
                setCar(response.data.car)
                setServices(response.data.services)
            } else {
                setError(t('order.noOrder'))
            }
        } catch(e) {
            console.error('getOrder', e)
        }
    }

    const endOrder = async () => {
        try {
            Alert.alert('Haluatko varmasti lopettaa tilauksen?', 'Auto tulee palauttaa 24 tunnin sisään tilauksen lopetuksesta', [
                {
                    text: 'Peruuta',
                    style: 'cancel',
                },
                {
                    text: 'Lopeta',
                    onPress: () => {
                        axios.put(`orders/${order._id}`, { active: false, ends_at: new Date() }).then(res => {
                            console.log(res.data)
                            if(res.data){
                                setOrder(res.data)
                            }
                        }).catch(e => {
                            console.error('endOrder', e)
                        })
                    },
                },
            ])
        } catch(e) {
            console.error('endOrder', e)
        }
    }

    return <Container scroll>
        { car ? <View>
            {car.image_url && <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: car.image_url }}></Image>}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', paddingHorizontal: 10 }}>
                <Text fontSize={36}>{car.manufacturer} </Text>
                <Text fontSize={36}>{car.model}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', marginRight: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text subtitle>Laina aloitettu</Text>
                    <Text fontSize={26}>{format(new Date(order.starts_at), 'dd.MM.yyyy')}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text subtitle>Laina loppuu</Text>
                    <Text fontSize={26}>{format(new Date(order.ends_at), 'dd.MM.yyyy')}</Text>
                </View>
            </View>
            <Divider />
            {order.active ? <Button style={{ margin: 10 }} color={COLORS.SECONDARY} onPress={endOrder}>Lopeta tilaus</Button> : <Text style={{ textAlign: 'center' }}>Tilaus on loppunut. Palauta auto 24 tunnin sisällä</Text>}
            {services != null && <View style={{ margin: 10 }}>
                <Text title>Valitut lisäpalvelut</Text>
                {Object.keys(services).map(key => {
                    return services[key] == true && <Text fontSize={16} key={key} style={{ marginLeft: 20 }}>{t(`${key}Service`)}</Text>
                })}
            </View>}
        </View> : error && <Text bold title style={{ margin: 30, textAlign: 'center' }}>{error}</Text>}
    </Container>
}

export default Order
