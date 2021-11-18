import React, { useState, useEffect } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'OpenSans_light'
    },
    bold: {
        fontFamily: 'OpenSans_bold'
    },
    title: {
        fontFamily: 'OpenSans_bold',
        fontSize: 24
    },
    subtitle: {
        fontFamily: 'OpenSans_bold',
        fontSize: 18
    },
});

const Text = ({ bold, title, subtitle, children, style, fontSize }) => {
    return <RNText
        style={[
            styles.text,
            bold && styles.bold,
            title && styles.title,
            subtitle && styles.subtitle,
            fontSize && {fontSize: fontSize},
            style]}>
        {children}
    </RNText>
}

export default Text