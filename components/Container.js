import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

const Container = ({ children, style, scroll }) => {
    return scroll == true ?
        <ScrollView style={[styles.container, style]}>{children}</ScrollView> :
        <View style={[styles.container, style]}>{children}</View>
}

export default Container;