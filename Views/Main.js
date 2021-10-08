import React, { useContext } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import CarStack from './Car/Index';
import UserStack from './Profile/Index';
import SearchStack from './Search/Index';
import SettingsStack from './Settings/Index';

const Tabs = createBottomTabNavigator();

const Main = (props) => {
    const { t } = useTranslation();
    return (
        <Tabs.Navigator screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#adad' }}}>
            <Tabs.Screen name={t("searchTabTitle")} component={SearchStack} options={{ name: 'searchStack' }} />
            <Tabs.Screen name={t("carTabTitle")}  component={CarStack} options={{ name: 'carStack'}} />
            <Tabs.Screen name={t("userTabTitle")}  component={UserStack} options={{ name: 'userStack' }} />
            <Tabs.Screen name={t("settingsTabTitle")}  component={SettingsStack} options={{ name: 'settingsStack' }} />
        </Tabs.Navigator>
    );
};

export default Main;
