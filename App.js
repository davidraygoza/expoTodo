import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomePageScreen from './pages/HomePageScreen';
import DetailPageScreen from './pages/DetailPageScreen';

/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open11 up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  HomePageScreenStack: { screen: HomePageScreen }, 
    //First entry by default be our first screen 
    //if we do not define initialRouteName
    DetailPageScreenStack: { screen: DetailPageScreen }, 
  },
  {
    initialRouteName: 'HomePageScreenStack',
  }
);
export default createAppContainer(App);
