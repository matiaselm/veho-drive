import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';

const Warnings = ({ navigation, route }) => {
    const { t } = useTranslation();

    return <Container>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/ABS.png')}></Image>
            </View>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Airbag.png')}></Image>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Akku.png')}></Image>
            </View>
        </View>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/DPF.png')}></Image>
            </View>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Hehku.png')}></Image>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Jarrut.png')}></Image>
            </View>
        </View>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Luistonesto.png')}></Image>
            </View>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Lämmöt.png')}></Image>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Moottori.png')}></Image>
            </View>
        </View>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Polttoaine.png')}></Image>
            </View>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/TPMS.png')}></Image>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 105, width: 110, }} resizeMode='contain' source={require('@/assets/lights/Öljy.png')}></Image>
            </View>
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
});

export default Warnings
