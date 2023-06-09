/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DetailsScreen from '../screens/DetailsScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HiddenEventsScreen from '../screens/HiddenEventsScreen';
import { GetTaskCompletedUserList } from '../screens/ScreenEventHistory';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useDispatch, useSelector } from 'react-redux';

export default function Navigation({ colorScheme }) {
  const identityPassed = useSelector(state => state.userdata.identityPassed)
  const accesspassed = useSelector(state => state.userdata.access)

  if (identityPassed && accesspassed) {
    return (<NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>

    );
  } else return null
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Описание мероприятия!' }} />
      <Stack.Screen name="ScreenEventHistory" component={GetTaskCompletedUserList} options={{ title: 'История выполнения задачи!' }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={EventsScreen}
        options={({ navigation }) => ({
          title: 'Мероприятия',
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color }) => <TabBarIcon name="window-restore" color={color} />,

        })}
      />
      <BottomTab.Screen
        name="HiddenEventsScreen"
        component={HiddenEventsScreen}
        options={{
          title: 'Скрытые мероприятия',
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color }) => <TabBarIcon name="eye-slash" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={SettingsScreen}
        options={{
          title: 'Настройки',
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Уведомления',
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />       */}
    </BottomTab.Navigator>
  );
}
//

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
