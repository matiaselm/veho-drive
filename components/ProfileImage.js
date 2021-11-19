import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Button from './Button.js';

const styles = StyleSheet.create({
    profileImage: {
        aspectRatio: 1,
        width: 130,
        borderRadius: 100,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    placeholder: {
        width: 50,
        backgroundColor: '#fff',
        elevation: 10,
    }
})

const ProfileImage = ({ image, size, style, onPress }) => {
    return <TouchableOpacity disabled={!onPress} onPress={onPress}>
        <ImageBackground source={{ uri: image }} style={[styles.profileImage, size && { width: size, borderRadius: size }, style]}>
            {!image && <>
                <View style={[
                    styles.profileImage,
                    styles.placeholder,
                    size && { width: size / 2, borderRadius: size / 2 },
                    { marginBottom: size ? size / 3 : 20 }]} />
                <View style={[
                    styles.profileImage,
                    styles.placeholder,
                    size && { width: size / 1.5, borderRadius: size / 1.5 },
                    { position: 'absolute', bottom: -40, width: size ? size / 1.5 : 80 }]} />
            </>}
        </ImageBackground>
    </TouchableOpacity>
}

export default ProfileImage;