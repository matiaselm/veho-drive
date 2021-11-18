import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height
    },
    padding: {
        padding: 10
    }
})

const Container = ({ children, style, scroll, padding }) => {
    return scroll == true ?
        <ScrollView style={[styles.container, padding && styles.padding, style]}>{children}</ScrollView> :
        <View style={[styles.container, padding && styles.padding, style]}>{children}</View>
}

export default Container;