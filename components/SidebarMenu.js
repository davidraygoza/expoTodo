import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';


 
export default class SidebarMenu extends Component {
  constructor() {
    super();
    this.items = [
        {
          navOptionThumb: 'home',
          navOptionName: 'Home',
          screenToNavigate: 'HomePageScreenStack',
        },
        {
          navOptionThumb: 'person',
          navOptionName: 'About',
          screenToNavigate: 'AboutPageScreenStack',
        },
        {
          navOptionThumb: 'public',
          navOptionName: 'Map',
          screenToNavigate: 'MapPageScreenStack',
        }
    ];
    }
    render() {
        return (
          <View style={styles.sideMenuContainer}>          
            {/*Setting up Navigation Options from option array using loop*/}
            <View style={{ width: '100%' }}>
              {this.items.map((item, key) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                  }}
                  key={key}>
                  <View style={{ marginRight: 10, marginLeft: 20 }}>
                    <Icon name={item.navOptionThumb} size={25} color="#808080" />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: global.currentScreenIndex === key ? 'red' : 'black',
                    }}
                    onPress={() => {
                      global.currentScreenIndex = key;
                      this.props.navigation.navigate(item.screenToNavigate);
                    }}>
                    {item.navOptionName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      }
}
const styles = StyleSheet.create({
    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 30,
    },
    sideMenuProfileIcon: {
      resizeMode: 'center',
      width: 150,
      height: 150,
      marginTop: 20,
      borderRadius: 150 / 2,
    },
  });
