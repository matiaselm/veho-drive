import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import Container from '@/components/Container';

const sources = [
    require('@/assets/lights/Airbag.png'),
    require('@/assets/lights/Akku.png'),
    require('@/assets/lights/Jarrut.png'),
    require('@/assets/lights/Lämmöt.png'),
    require('@/assets/lights/Öljy.png'),
    require('@/assets/lights/Hehku.png'),
    require('@/assets/lights/Luistonesto.png'),
    require('@/assets/lights/Moottori.png'),
    require('@/assets/lights/Polttoaine.png'),
    require('@/assets/lights/TPMS.png'),
    require('@/assets/lights/DPF.png'),
    undefined
]

const Warnings = ({ navigation, route }) => {
    return <Container>
        <FlatList
            ListHeaderComponent={() => <Text style={styles.text2}>
                Syttyikö auton mittaristoon jokin vikavalo? Paina syttyneen vikavalon kuvaa, niin saat apua ongelmaan. Voit myös aina olla suoraan yhteydessä Vehon palvelunumeroon.
            </Text>}
            numColumns={3}
            data={sources}
            renderItem={({ item }) => <TouchableOpacity style={styles.container2} activeOpacity={0.7}>
                <Image style={styles.light} resizeMode='contain' source={item} />
            </TouchableOpacity>}
            keyExtractor={(item, index) => index}
        />
    </Container>
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        elevation: 5,
        borderRadius: 10,
        padding: 10
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
    text2: {
        color: '#000',
        fontSize: 16,
        padding: 14,
        alignItems: 'center',
    },
    light: {
        height: 90,
        width: 90,
    }
});

export default Warnings
