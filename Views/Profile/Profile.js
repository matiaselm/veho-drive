import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';

const Profile = ({ navigation, route }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.container3}>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://img.ilcdn.fi/W3NZqtFn2x5avcK1p5wUuTDMS7M=/full-fit-in/612x0/img-s3.ilcdn.fi/4553c0d5b295cd783ea2f7498ea41dcee06fc3212cff54ab2ac292df2497e2a2.jpg' }}></Image>
                    <Text style={styles.text1}>Jarmo</Text>
                </View>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://cdn.mos.cms.futurecdn.net/mrArzwHcNuQbRwbEmuiwdJ-1200-80.jpg' }}></Image>
                    <Text style={styles.text1}>Bonustaso</Text>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://media.newyorker.com/photos/59776d0672c5e854a512693d/2:2/w_1028,h_1028,c_limit/Hsu-Monkey-Videos-as-a-Way-of-Life.jpg' }}></Image>
                    <Text style={styles.text1}>Veho</Text>
                </View>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://pasa.org/wp-content/uploads/2021/03/Vervet-Monkey-Foundation-credit-Kyle-2.jpg' }}></Image>
                    <Text style={styles.text1}>Tilaukset</Text>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://www.gannett-cdn.com/indepth-static-assets/uploads/master/8372074002/65b91417-9b21-4ce8-a9ce-76d5125c0ed3-placeholer.jpg?width=2160' }}></Image>
                    <Text style={styles.text1}>Huolto</Text>
                </View>
                <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://th-thumbnailer.cdn-si-edu.com/nBS-pC9IPPIMNCEiK_BaZNGdWh0=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/38/ee/38ee7aaa-abbb-4c60-b959-4b1c5c8c6989/axgpay.jpg' }}></Image>
                    <Text style={styles.text1}>Menneet tapahtumat</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container2: {
        height: 180,
        width: '47%',
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#000',
    },
    container3: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'flex-start',
        margin: 5,
        backgroundColor: '#fff',
    },
    text1: {
        color: '#000', 
        fontSize: 26,
    },
    
});

export default Profile
