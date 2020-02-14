import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image, Dimensions, Button } from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { createStackNavigator} from 'react-navigation-stack';
import HomePageScreen from './pages/HomePageScreen';
import DetailPageScreen from './pages/DetailPageScreen';
import AboutPageScreen from './pages/AboutPageScreen';
import MapPageScreen from './pages/MapPageScreen';
import SidebarMenu from './components/SidebarMenu';
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const HomePage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  HomePageScreenStack: {
    screen: HomePageScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 1',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
const DetailPage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  DetailPageScreenStack: {
    screen: DetailPageScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Detail',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('HomePageScreenStack',{ user_id: 2})}
          title="< Back"
          color="#f0f0f0"
        />
      ),
    }),
  },
});
const AboutPage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  AboutPageScreenStack: {
    screen: AboutPageScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'About',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('HomePageScreenStack',{ user_id: 2})}
          title="< Back"
          color="#f0f0f0"
        />
      ),
    }),
  },
});
const MapPage_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  MapPageScreenStack: {
    screen: MapPageScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('HomePageScreenStack',{ user_id: 2})}
          title="< Back"
          color="#f0f0f0"
        />
      ),
    }),
  },
});


const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: { screen: HomePage_StackNavigator },
    NavScreen2: { screen: DetailPage_StackNavigator },
    NavScreen3: { screen: AboutPage_StackNavigator },
    NavScreen4: { screen: MapPage_StackNavigator },
  },
  {
    contentComponent: SidebarMenu,
    drawerWidth: Dimensions.get('window').width - 120,
  }
);
export default createAppContainer(Drawer);
