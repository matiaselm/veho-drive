import React, { useState, useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { COLORS } from '@/styles/constants';
import Text from './Text.js';

const Button = ({ onPress, text, textColor, icon, iconColor, iconSize, color, style }) => {
    const darken = (color, percent = -60) => {
        try {
            let R = parseInt(color.substring(1,3),16);
            let G = parseInt(color.substring(3,5),16);
            let B = parseInt(color.substring(5,7),16);

            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);

            R = (R<255)?R:255;
            G = (G<255)?G:255;
            B = (B<255)?B:255;

            let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
            let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
            let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

            return "#"+RR+GG+BB;
        } catch(e) {
            console.error(e)
            return color
        }
    }

    return <Pressable
        style={({ pressed }) => [
            {
                backgroundColor: pressed ? darken(color ?? COLORS.PRIMARY) : color ?? COLORS.PRIMARY
            },
            styles.orderButton, style]} onPress={onPress} activeOpacity={0.6}>
        <Text style={[ styles.buttonText, { color: textColor ?? '#fff' }]}>{text}</Text>
        { icon != null && <Icon name={icon} color={iconColor ?? '#fff'} size={iconSize ?? 30} style={{ marginLeft: 5 }}/> }
    </Pressable>
}

const styles = StyleSheet.create({
    orderButton: {
        width: 100,
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      buttonText: {
        textAlign: 'center'
      }
})

export default Button