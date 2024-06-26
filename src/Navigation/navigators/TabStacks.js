import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './Tabs';
import { Profile,ArticleDetail } from 'Screens';
import  MatchDetails  from '../../Screens/Discover/MatchDetails'; // Adjust the file path as needed


const Stack = createStackNavigator();

const TabStacks = ({ params }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ArticleDetail"
      component={ArticleDetail}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="MatchDetails"
      component={MatchDetails}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default TabStacks;
