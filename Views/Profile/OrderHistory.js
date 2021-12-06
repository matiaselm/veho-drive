import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, RefreshControl, Image } from 'react-native';
import Text from '@/components/Text';
import Container from '@/components/Container';
import axios from '@/services/axios';
import AppContext from '@/services/AppContext';
import { format } from 'date-fns'; 
import { fi } from 'date-fns/locale'

const styles = StyleSheet.create({
    order: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

const OrderHistory = ({ route, navigation }) => {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response = await axios.get(`/orders?user_id=${user._id}`);
            if(response.data) {
                setOrders(response.data);
            }
        } catch(e) {
            console.error(e)
        }
        setIsLoading(false);
        setIsRefreshing(false);
    }

    const refresh = () => {
        setIsRefreshing(true);
        getOrders();
    }

    return <Container>
        { isLoading ? <Text>Loading...</Text> :
        <FlatList
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refresh} />}
            data={orders}
            extraData={orders?.length}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <View style={styles.order}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.car?.image_url }} style={{ width: 140, height: 100, borderRadius: 10 }} />
                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-around' }}>
                        <Text subtitle>{item.car?.manufacturer} {item.car?.model}</Text>
                        <View style={{ flexDirection: 'row' }}><Text bold>Alkoi: </Text><Text>{format(new Date(item.starts_at), 'dd.MM.yyyy @HH:mm')}</Text></View>
                        <View style={{ flexDirection: 'row' }}><Text bold>Päättyi: </Text><Text>{format(new Date(item.ends_at), 'dd.MM.yyyy @HH:mm')}</Text></View>
                        <Text bold>{item.car.monthly_price}€/kk</Text>
                    </View>
                </View>
            </View>}
        ></FlatList>}
    </Container>;
}

export default OrderHistory;
