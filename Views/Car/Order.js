import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '@/components/Container';
import Divider from '@/components/Divider';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns'; 
import { fi } from 'date-fns/locale'
import Text from '@/components/Text';

const Order = ({ navigation, route }) => {
    const [ car, setCar ] = useState(null)
    const [ order, setOrder ] = useState(null)
    const [ services, setServices ] = useState(null)
    const { t } = useTranslation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getOrder()
        })
        
        return unsubscribe;
    },[])

    const getOrder = async () => {
        try {
            AsyncStorage.getItem('order').then(res => {
                res = JSON.parse(res)
                if(res) {
                    setOrder(res)
                    setCar(res.car)
                    setServices(res.services)
                }
            })
        } catch(e) {
            console.error(e)
        }
    }

    return <Container scroll>
        {car != null ? <View>
            {car.image != null && <Image style={{ height: 300, width: '100%', backgroundColor: '#aaa' }} source={{ uri: car.image }}></Image>}
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
            {services != null && <View style={{ margin: 10 }}>
                <Text title>Valitut lisäpalvelut</Text>
                {Object.keys(services).map(key => {
                    return services[key] == true && <Text fontSize={16} key={key} style={{ marginLeft: 20 }}>{t(`${key}Service`)}</Text>
                })}
            </View>}
        </View> : <ActivityIndicator />}
    </Container>
}

export default Order