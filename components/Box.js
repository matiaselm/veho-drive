import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Pressable, View, ImageBackground, Dimensions } from 'react-native';
import Text from './Text.js';

const styles = StyleSheet.create({
    card: {
        width: ((Dimensions.get('window').width) / 3) - 10,
        margin: 5,
        elevation: 5,
        aspectRatio: 1,
        minHeight: 180,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection:'column'
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden'
    },
    textBody: {
        padding: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        color: '#000',
        fontSize: 14
    },
    subtitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14
    },
    text: {
        color: '#000',
        fontSize: 14,
    },
    image: {
        flex: 1.5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
    bottomText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
})

const Box = ({ children, title, subtitle, additional, onPress, imageUrl, imageStyle, style }) => {
    return <View style={[styles.card, style]}>
        <Pressable onPress={onPress} style={styles.body}>
            {imageUrl != null && <ImageBackground source={{ uri: imageUrl }} style={[styles.image, imageStyle]} />}
            <View style={styles.textBody}>
                {title != null && <Text style={styles.title}>{title}</Text>}
                <View style={styles.bottomText}>
                    {subtitle != null && <Text style={styles.subtitle}>{subtitle}</Text>}
                    {additional != null && <Text style={styles.text}>{additional}</Text>}
                </View>
            </View>
            {children}
        </Pressable>
    </View>
}

export default Box;