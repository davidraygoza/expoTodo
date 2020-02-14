import React, { Component } from 'react';
import { StyleSheet, View,  Text, Linking,Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
export default class MapPageScreen extends Component {
    constructor(props) {
        //constructor to set default state
        super(props);
    }
    render() {
        return (
            //View to hold our multiple components
            <View style={styles.container}>
                <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
      />

                
            </View>    
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
        padding: 15,
        justifyContent: 'flex-start',
    },
    textContact:{
        fontSize:18
    }
});    