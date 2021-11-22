import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';

const Profile = ({ navigation, route }) => {
    const { t } = useTranslation();

    return <Container>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <ProfileImage image='https://img.ilcdn.fi/W3NZqtFn2x5avcK1p5wUuTDMS7M=/full-fit-in/612x0/img-s3.ilcdn.fi/4553c0d5b295cd783ea2f7498ea41dcee06fc3212cff54ab2ac292df2497e2a2.jpg' />
                {/*<Image style={{ height: 120, width: 130, backgroundColor: '#aaa' }} source={{ uri: 'https://img.ilcdn.fi/W3NZqtFn2x5avcK1p5wUuTDMS7M=/full-fit-in/612x0/img-s3.ilcdn.fi/4553c0d5b295cd783ea2f7498ea41dcee06fc3212cff54ab2ac292df2497e2a2.jpg' }}></Image>*/}
                <Text style={styles.text1}>Jarmo</Text>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, }} source={require('@/assets/icons/bonus_sininen.png')}></Image>
                <Text style={styles.text1}>Bonustaso</Text>
            </View>
        </View>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 120, width: 130, }} resizeMode='contain' source={require('@/assets/icons/veho_logo.png')}></Image>
                <Text style={styles.text1}>Yhteystiedot</Text>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, }} source={require('@/assets/icons/membership_sininen.png')}></Image>
                <Text style={styles.text1}>Tilaus</Text>
            </View>
        </View>
        <View style={styles.container3}>
            <View style={[styles.container2, { borderRightWidth: 2, }]}>
                <Image style={{ height: 120, width: 130, }} resizeMode='contain' source={require('@/assets/icons/settings_sininen.png')}></Image>
                <Text style={styles.text1}>Huolto</Text>
            </View>
            <View style={styles.container2}>
                <Image style={{ height: 120, width: 130, }} source={require('@/assets/icons/membership_sininen.png')}></Image>
                <Text style={[styles.text1, { fontSize: 17, }]}>Menneet tapahtumat</Text>
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

export default Profile
