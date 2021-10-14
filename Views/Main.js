import React, { useContext } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Ionicons as Icon } from '@expo/vector-icons';

import CarStack from './Car/Index';
import UserStack from './Profile/Index';
import SearchStack from './Search/Index';
import SettingsStack from './Settings/Index';

const Tabs = createBottomTabNavigator();

const Main = (props) => {
    const { t } = useTranslation();

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                headerStyle: { backgroundColor: '#adad' },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let name;
                    if (route.name === t("searchTabTitle")) {
                        name = focused ? 'search' : 'search-outline'
                    } else if (route.name === t("carTabTitle")) {
                        name = focused ? 'car' : 'car-outline';
                    } else if (route.name === t("userTabTitle")) {
                        name = focused ? 'person' : 'person-outline';
                    } else if (route.name === t("settingsTabTitle")) {
                        name = focused ? 'cog' : 'cog-outline';
                    }
                    return <Icon name={name} size={size} color={color} />;
                }})
            }>
            <Tabs.Screen name={t("searchTabTitle")} component={SearchStack} options={{ name: 'searchStack' }} />
            <Tabs.Screen name={t("carTabTitle")}  component={CarStack} options={{ name: 'carStack' }} />
            <Tabs.Screen name={t("userTabTitle")}  component={UserStack} options={{ name: 'userStack'}} />
            <Tabs.Screen name={t("settingsTabTitle")}  component={SettingsStack} options={{ name: 'settingsStack' }} />
        </Tabs.Navigator>
    );
};

export default Main;
