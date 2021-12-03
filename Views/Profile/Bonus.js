import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import ProfileImage from '@/components/ProfileImage';
import Text from '@/components/Text';
import Container from '@/components/Container';

const Bonus = ({ route, navigation }) => {
    const [bonus, setBonus] = useState({
        '1 Taso': {
            points: 10,
            benefits: [
                'Kahvi'
            ]
        },
        '2 Taso': {
            points: 100,
            benefits: [
                'Kahvi',
                '5% alennus seuraavasta tilauksesta'
            ]
        },
        '3 Taso': {
            points: 200,
            benefits: [
                'Kahvi',
                '8% alennus seuraavasta tilauksesta',
                'Pesupalvelu ilmaiseksi'
            ]
        }
    });

    const [guide] = useState({
        title: 'Saat pisteitä tilauksista, mitä pidempi tilaus, sitä enemmän pisteitä. Pisteet pysyvät muuttumattomina viimeisimmän tilauksesi jälkeen 6 kuukautta, jonka jälkeen menetät yhden tason kuukaudessa. Tilauksen ollessa voimassa, saat yhden pisteen per päivä.',
        points: [
            'Tilauksen tekemisestä saat 10 pistettä.',
            'Hyvin sujuneesta tilauksen palauttamisesta saat ylimääräiset 10 pistettä.',
            'Jos ilmoitat autoon tai tilaukseen tulleesta ongelmasta, saat 10 pistettä.'
        ]
    });

    return <Container padding scroll>
        <Text bold style={styles.text2}>Tervetuloa Bonusohjelman etusivulle. Löydät täältä tietoa eri tasoista ja niiden tuomista eduista.</Text>
        <View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>{guide.title}</Text>
            {guide.points.map((point, index) => <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                <Text bold> - </Text><Text bold>{point}</Text>
            </View>)}
        </View>
        {Object.keys(bonus).map((key, index) => {
            return <View key={index} style={{ margin: 10 }}>
                <Text title>{key} - {bonus[key].points} pistettä</Text>
                {bonus[key].benefits.map((benefit, index) => {
                    return <Text style={{ marginLeft: 20, fontSize: 20 }} key={index}>- {benefit}</Text>
                })}
            </View>
        })}
        <View style={{ paddingBottom: 40}} />
    </Container>;
}

const styles = StyleSheet.create({
    text2: {
        color: '#000',
        fontSize: 18,
        padding: 14,
        textAlign: 'center',
    },
});

export default Bonus
