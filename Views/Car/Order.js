import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Container from '@/components/Container';
import Divider from '@/components/Divider';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns'; 
import { fi } from 'date-fns/locale'

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
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{car.manufacturer} </Text>
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{car.model}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', marginRight: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 20, color: '#000'  }}>Laina aloitettu</Text>
                    <Text style={{ fontSize: 26, fontWeight: '100', color: '#000' }}>{format(new Date(order.starts_at), 'dd.MM.yyyy')}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 20, color: '#000' }}>Laina loppuu</Text>
                    <Text style={{ fontSize: 26, fontWeight: '100', color: '#000' }}>{format(new Date(order.ends_at), 'dd.MM.yyyy')}</Text>
                </View>
            </View>
            <Divider />
            {services != null && <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 26 }}>Valitut lisäpalvelut</Text>
                {Object.keys(services).map(key => {
                    return services[key] == true && <Text key={key}>{t(`${key}Service`)}</Text>
                })}
            </View>}
        </View> : <ActivityIndicator />}
    </Container>
}

export default Order