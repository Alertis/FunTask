import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity,AsyncStorage } from 'react-native';
import { Actions } from "react-native-router-flux";
import * as con from '../config/config'
import * as uti from '../utils/Utils'

/*
  API usage :  https://playground-test-api.herokuapp.com/api/candidate/:id
*/

export default class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      fullName:''
    };
  }
 
  _onPress() {
    Alert.alert('My Informations','Client-ID: '+this.state.token+' \n Kullanıcı Adı: '+this.state.fullName)
  }

  componentWillMount(){
    uti.FetchData(con.HOST_URL.GET_URL+this.props.token+"/").then(res => {
      this.setState({
        token:this.props.token,
        fullName:res["candidate"]["candidateName"]
      });
    })
    
  }
  
  render() {
      
    return (
      <View style={styles.container}>
        <Text styles={styles.welcome}>Welcome</Text>
        <Text styles={styles.welcome}>{this.state.fullName}</Text>

        <TouchableOpacity onPress={() => this._onPress()} style={styles.actionButton}>
          <Text style={styles.actionText}>Get My Informations</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  actionButton: {
    borderWidth: 1,
    overflow: "hidden",
    marginTop: "3%",
    backgroundColor: "white",
    width: "80%", height: "6%",
    borderRadius: 20,
    borderColor: "#4286f4",
    marginBottom: 10
  },
  actionText: {
    marginTop: 3,
    textAlign: "center",
    alignContent: 'center',
    fontSize: 20,
    color: "#4286f4",
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
