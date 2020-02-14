import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput,FlatList, Text, Alert,Linking,Image } from 'react-native';
export default class HomePageScreen extends Component {
    constructor(props) {
        //constructor to set default state
        super(props);
    }
    render() {
        return (
            //View to hold our multiple components
            <View style={styles.container}>
                <Text 
            onPress={() => Linking.openURL('http://www.techuso.com/')}>
                <Image 
    source={{uri: 'http://www.techuso.com/images/techuso-logo.png'}} 
    style={{height:50, width:150}} />
     </Text>
                <Text style={styles.textContact}><Text style={{fontWeight:'bold'}}> Ceo:</Text>: Rick Meredith </Text>
                <Text style={styles.textContact}><Text style={{fontWeight:'bold'}}> Developer FullStack:</Text> David Israel Raygoza  </Text>
                
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