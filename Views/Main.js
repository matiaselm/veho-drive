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
                    if (route.name === "Search") {
                        name = focused ? 'search' : 'search-outline'
                    } else if (route.name === 'Subscription') {
                        name = focused ? 'car' : 'car-outline';
                    } else if (route.name === 'Profile') {
                        name = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        name = focused ? 'cog' : 'cog-outline';
                    }
                    return <Icon name={name} size={size} color={color} />;
                }})
            }>
            <Tabs.Screen name={'Search'} component={SearchStack} options={{ name: 'searchStack' }} />
            <Tabs.Screen name={'Subscription'}  component={CarStack} options={{ name: 'carStack' }} />
            <Tabs.Screen name={'Profile'}  component={UserStack} options={{ name: 'userStack'}} />
            <Tabs.Screen name={'Settings'}  component={SettingsStack} options={{ name: 'settingsStack' }} />
        </Tabs.Navigator>
    );
};

export default Main;
