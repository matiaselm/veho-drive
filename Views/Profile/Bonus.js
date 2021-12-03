import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Container from '@/components/Container';

const Bonus = ({ navigation, route }) => {
    const { t } = useTranslation();

    return <Container>
        <View style={styles.container3}>
            <Text style={styles.text2}>Tervetuloa Bonusohjelman etusivulle. Löydät täältä tietoa eri tasoista ja niiden tuomista eduista.</Text>
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

export default Bonus
