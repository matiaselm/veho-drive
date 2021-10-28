import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    card: {
        minWidth: 50,
        minHeight: 100,
        flexDirection: 'column'
    },
    title: {
        flex: 1,
        color: '#000'
    },
    image: {
        flex: 3,
        borderRadius: 10
    }
})

const Box = ({ children, title, onPress, imageUrl, imageStyle, style }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
        { imageUrl != null && <ImageBackground source={{ uri: imageUrl }} style={[styles.image, imageStyle]} />}
        { title != null && <Text style={styles.title}>{title}</Text> }
        { children }
    </TouchableOpacity>
}

export default Box;