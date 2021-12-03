import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';

const Veho = ({ navigation, route }) => {
    const { t } = useTranslation();

    return <Container>
        <View style={styles.container3}>
            <Text style={styles.text2}>Onko sinulla ongelmia auton kanssa? Haluatko varata ajan huoltoon? Mitä tahansa muita kysymyksiä?</Text>
            <Text style={styles.text2}>Voit tällä sivulla olla suoraan yhteydessä Vehon asiakaspalveluun. Valitse itseäsi lähin toimipiste ja löydät sen yhteystiedot:</Text>
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
    text2: {
        color: '#000',
        fontSize: 16,
        padding: 14,
        alignItems: 'center',
    },
});

export default Veho
