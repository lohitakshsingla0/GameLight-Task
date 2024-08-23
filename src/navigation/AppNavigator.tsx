
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Use Expo vector icons for tab icons
import GamesScreen from '../screens/GamesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Games') {
            iconName = 'games';
          } else if (route.name === 'Favourites') {
            iconName = 'favorite';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Games" component={GamesScreen} options={{ title: 'Games' }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ title: 'Favourites' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
