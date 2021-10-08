import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import './Services/i18n';
import Main from './Views/Main';

const App = () => {
  return (<>
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    <StatusBar style="auto" />
    </>
  );
};

export default App
