/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, Text, View, TextInput, Picker, Alert } from 'react-native';
import { Card,Button } from 'react-native-elements';
export default class Questionnaire extends React.Component {

  constructor(props) {
    super(props)
    console.log("checked state" + this.state);
    this.state = {
      fever: "0",
      cough: "0",
      temperature: "0.0"
    };
  }
  fetchDetailsFromAPI() {

    let url = "https://ah8uun9mll.execute-api.eu-west-2.amazonaws.com/live/flu-detect-resource?temperature="
      + this.state.temperature
      + "&cough="
      + this.state.cough
      + "&fever="
      + this.state.fever;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson.body);
        return responseJson.body;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Card title="Questionnaire for Flu Detection">
          <Text style={styles.paragraph}>
            Please enter details of symptoms you have faced
                  </Text>
          <Text style={styles.question}>
            Have you had fever over the last 5 days?
                  </Text>
          <Picker
            selectedValue={this.state.fever}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ fever: itemValue })
            }>
            <Picker.Item label="Yes" value="1" />
            <Picker.Item label="No" value="0" />
          </Picker>
          <Text style={styles.question}>
            Temperature measurement
              </Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.0 C"
            keyboardType="number-pad"
            onChangeText={(text) => this.setState({ temperature: text })}
          ></TextInput>

          <Text style={styles.question}>
            Have you had cough?
                  </Text>
          <Picker
            selectedValue={this.state.cough}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ cough: itemValue })
            }>
            <Picker.Item label="Yes" value="1" />
            <Picker.Item label="No" value="0" />
          </Picker>
          <View>
            <Button
              title="Submit"
              onPress={this.fetchDetailsFromAPI.bind(this)}
            />
          </View>

        </Card>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  question: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#34495e',
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  picker: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

