import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height
    }
})

const Container = ({ children, style, scroll }) => {
    return scroll == true ?
        <ScrollView style={[styles.container, style]}>{children}</ScrollView> :
        <View style={[styles.container, style]}>{children}</View>
}

export default Container;