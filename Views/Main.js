import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Ionicons as Icon } from '@expo/vector-icons';

import CarStack from './Car/Index';
import UserStack from './Profile/Index';
import SearchStack from './Search/Index';
import SettingsStack from './Settings/Index';

const Tabs = createBottomTabNavigator();

const Main = () => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                headerStyle: { backgroundColor: '#adad' },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let name;
                    if (route.name === 'SearchStack') {
                        name = focused ? 'search' : 'search-outline'
                    } else if (route.name === 'OrderStack') {
                        name = focused ? 'car' : 'car-outline';
                    } else if (route.name === 'ProfileStack') {
                        name = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'SettingsStack') {
                        name = focused ? 'cog' : 'cog-outline';
                    }
                    return <Icon name={name} size={size} color={color} />;
                }})
            }>
            <Tabs.Screen name={'SearchStack'} component={SearchStack} options={{ name: 'searchStack' }} />
            <Tabs.Screen name={'CarStack'}  component={CarStack} options={{ name: 'carStack' }} />
            <Tabs.Screen name={'UserStack'}  component={UserStack} options={{ name: 'userStack'}} />
            <Tabs.Screen name={'SettingsStack'}  component={SettingsStack} options={{ name: 'settingsStack' }} />
        </Tabs.Navigator>
    );
};

export default Main;
