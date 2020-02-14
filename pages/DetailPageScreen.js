// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text,TextInput,Button,Alert } from 'react-native';
//import all the components we are going to use.
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("data.db") 
export default class DetailPageScreen extends Component {
  state = {
    username: '',
    email: '',
    phone: '',
    isFetching: false,
    user_id:0
  };
    constructor(props) {
        //constructor to set default state
        super(props);
        this.state.user_id=this.props.navigation.state.params.user_id;
    }
    
    componentDidMount() {        
        /*this.setState({
            user_id: this.props.navigation.state.params.user_id
         });*/
       /*  , () => {
          this.searchUser();
        }*/
        this.searchUser();

    }
    /*componentDidUpdate(props) {
     
     
    }*/
    searchUser = () => {        
      console.log({'ddd':this.state.user_id});
        const {input_user_id} =this.state.user_id;
        if(this.state.user_id==0){
          return false;
        }
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM table_user where user_id = ?',
            [String(this.state.user_id)],
            (tx, results) => {
              var len = results.rows.length;
              console.log({'record':results.rows.item(0)});
              if (len > 0) {
                this.setState({
                 username:results.rows.item(0).user_name,
                });
                this.setState({
                 phone:results.rows.item(0).user_contact,
                });
                this.setState({
                 email:results.rows.item(0).user_address,
                });
              }else{
                alert('No user found');
                this.setState({
                  username:'',
                  phone:'',
                  email:'',
                });
              }
            }
          );
        });
      };
    static navigationOptions = {
        //Setting the header of the screen
        title: 'Second Page',
    };    
    savingData() {
         this.register_user();
    }  
    register_user = () => {      
      var that = this;
      const { username } = this.state;
      const { phone } = this.state;
      const { email } = this.state;
      const { user_id } = this.state;
        if (username) {
        if (phone) {
          if (email) {
            db.transaction(function(tx) {
              if(user_id==0){
                console.log("neewww");
                tx.executeSql(
                  'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                  [username, phone, email],
                  (tx, results) => {
                     if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [{ text: 'Ok',
                            onPress: () =>
                              that.props.navigation.navigate('HomePageScreenStack',{ user_id: 2}),
                          },],
                        { cancelable: false }
                      );
                    } else {
                      alert('Registration Failed');
                    }
                  }
                );
              }else{
                  //console.log({"*****----->>>>updating":33333,'user_id':user_id});
                  //return false;
                  tx.executeSql(
                    'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
                    [username, phone, email, user_id],
                    (tx, results) => {
                      console.log('Results',results.rowsAffected);
                      if(results.rowsAffected>0){
                        Alert.alert( 'Success', 'User updated successfully',
                          [
                            {text: 'Ok', onPress: () => that.props.navigation.navigate('HomePageScreenStack',{ user_id: 2})}, //
                          ],
                          { cancelable: false }
                        );
                      }else{
                        alert('Updation Failed');
                      }
                    }
                  );
              }              

            });
          } else {
            alert('Please fill Address');
          }
        } else {
          alert('Please fill Contact Number');
        }
      } else {
        alert('Please fill Name');
      }
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
          //View to hold our multiple components
          <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.TextStyle}>{"Name:"}</Text> 
                <TextInput
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                placeholder={'Enter name'}
                style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.TextStyle}>Email:</Text> 
                <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder={'Enter Email'}
                style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.TextStyle}>Number:</Text> 
                <TextInput
                value={String(this.state.phone)}
                onChangeText={phone => this.setState({ phone })}
                placeholder={'Enter Number'}
                style={styles.input}
                />
            </View>
            <Button
              title="Save"
              onPress={() =>{ this.savingData();}
             }/>
          </View>
        );
    }  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    row:{
       
        flexDirection: 'row',
        justifyContent: 'center',
    },
    TextStyle: {
        paddingTop:25,
        fontSize: 18,
        textAlign: 'center',
        color: '#f00',
        width:"30%",       
    },
    input: {
        width: "65%",
        height: 44,
        padding: 2,
        marginBottom: 10,
        marginTop: 10,
        borderColor:"#dcdcdc",
        borderStyle:"solid",
        borderWidth:1
      },
  });