import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, Alert } from 'react-native';
import * as uti from '../utils/Utils'
import * as con from '../config/config'
import { Actions } from "react-native-router-flux";

export default class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      token: null,
    };
  }

  _onSend() {
    if (this.state.fullName.length > 0) {
      var readyData = {
        fullName: this.state.fullName
      }
      uti.PostData(con.HOST_URL.POST_URL, 'POST', readyData).then(res => {
        AsyncStorage.setItem("token", res.candidate.candidateId)
        this.setState({
          token: res.candidate.candidateId
        });
        Actions.Candidate({ token: res.candidate.candidateId, fullName:this.state.fullName })
      })
    } else {
      Alert.alert('You should enter your name.')
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Fun Task!</Text>
        <View>
          <TextInput style={styles.textInput} maxLength={150} placeholder="Type your name" onChangeText={text => {
            this.setState(prevState => ({
              ...prevState, fullName: text
            }));
          }} />
          
          <View style={styles.sendButtonView}>
            <Button color="#841584" styleDisabled={{ color: "red" }} onPress={() => this._onSend()} title="Sign Me In" />
          </View>
        </View>
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
  textInput: {
    borderRadius: 5,
    borderColor: 'black',
    fontSize: 20,
    margin: 20
  },
  sendButtonView: {
    marginTop: 30,
  },
});
