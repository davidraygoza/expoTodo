import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Button, TextInput,FlatList, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("data.db")
 
export default class HomePageScreen extends Component {
    constructor(props) {
        //constructor to set default state
        super(props);
        this.state = {
          username: '',
          FlatListItems: [],
          isFetching: false,
          deletedRow:false
        };
        this.getData();
        this.checkDb();
      }
      checkDb(){
        db.transaction(function(txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function(tx, res) {
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                  []
                );
              }
            }
          );
        });
      }
      getData(){
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }          
              this.setState({
                FlatListItems: temp,
                isFetching: false
              });
            });
          });
    }
    alertDelete(row){
      Alert.alert(
        'Delete',
        'Do you want to delete:'+ row.user_name,
        [{ text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
        
        },{ text: 'Yes',
            onPress: () =>{
              this.deleteRow(row.user_id);
            }            
          },],
        { cancelable: false }
      );    
    };
    deleteRow(userId)
    {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  table_user where user_id=?',
          [userId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              this.setState({deletedRow:true},()=>{
                window.setTimeout(()=>{
                  this.setState({deletedRow:false})
                },2000)
              });
            } else {
              alert('Please insert a valid User Id');
            }
          }
        );
      });
    };
    ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
      };
      onRefresh() {          
         this.getData();       
      }
      static navigationOptions = {
        title: 'Directory',
      };
      UNSAFE_componentWillUpdate(prevProps, prevState) {
        this.getData();       
      }
      componentDidUpdate(props) {
       
      }
      render() {
        const { navigate } = this.props.navigation;
        return (
          //View to hold our multiple components
          <View style={styles.container}>
            {/*Input to get the value from the user*/}
            <View >
            {this.state.deletedRow ? (
             <Text style={styles.deletedRow}>Record deleted!</Text> 
            ): null}
            </View>
            {/*Button to go to the next activity*/}
            <Button
              title="New Record"
              //Button Title
              onPress={() =>
                navigate('DetailPageScreenStack', {
                  JSON_ListView_Clicked_Item: this.state.username,
                  user_id:0
                })
              }
              //On click of the button we will send
              //the data as a Json from here to the Second Screen using navigation prop
            />
            <FlatList
             onRefresh={() => this.onRefresh()}
             refreshing={this.state.isFetching}
            data={this.state.FlatListItems}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            style={{
                paddingVertical: 5,
                borderTopWidth: 1,
                borderColor: "#CED0CE",
                width:"98%"
              }}
            renderItem={({ item }) => (
              <View key={item.user_id} style={{ backgroundColor: 'white', padding: 15,flexDirection: 'column' }}>
                   <View style={{flex: 1, flexDirection: 'row'}}>
                   <Text style={{width:"90%"}}>Name: {item.user_name}-{item.user_id}</Text>
                   <Ionicons
                    name={
                        Platform.OS === 'ios'
                          ? `ios-trash`
                          : 'md-trash'
                      }
                    size={26}
                    style={{ marginBottom: -3 }}
                    onPress={() => {
                         this.alertDelete(item);                       
                    }}
                    />  
                    <Ionicons
                    name={
                        Platform.OS === 'ios'
                          ? `ios-create`
                          : 'md-create'
                      }
                    size={26}
                    style={{ marginBottom: -3, marginLeft: 5,}}
                    onPress={() => {
                        console.log({'item':item.user_name});
                        navigate('DetailPageScreenStack', {
                            JSON_ListView_Clicked_Item: item.user_name,
                            user_id: item.user_id,
                          })                       
                    }}
                    />  
                </View>  
                <Text>Contact: {item.user_contact}</Text>
                <Text>Address: {item.user_address}</Text>
              </View>
            )}
          />
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          padding: 5,
        },
        input: {
          width: 250,
          height: 44,
          padding: 10,
          marginBottom: 10,
          marginTop: 10,
          backgroundColor: '#DBDBD6',
        },
        deletedRow:{
          color: '#dd6666',
          fontSize: 19          
        }
      });