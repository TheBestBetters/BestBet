import { Font } from 'expo';
import React, { Component } from 'react';
import {
  Button, Keyboard, Picker, PickerIOS, StyleSheet, TextInput, Text,
  TouchableWithoutFeedback, TouchableOpacity, View
} from 'react-native';

import Modal from "react-native-modal";

const ALLOWABLE_MONTHS = 12;
const ALLOWABLE_DAYS = 366;
const ALLOWABLE_WEEKS = 52;

function validateInvestmentMagnitude(instance) {
  var investmentPeriodUnits = instance.state.investmentPeriodUnits;
  var investmentPeriodMagnitude = parseInt(
    instance.state.investmentPeriodMagnitude);

  if (investmentPeriodMagnitude == NaN) {
    return false;
  }

  if (investmentPeriodUnits == 'days') {
    return investmentPeriodMagnitude <= 366;
  } else if (investmentPeriodUnits == 'weeks') {
    return investmentPeriodMagnitude <= 52;
  } else {
    return investmentPeriodMagnitude <= 12;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '',
      amountDesired: '',
      investmentPeriodMagnitude: '',
      investmentPeriodUnits: 'days',
      hasValidInvestmentMagnitude: true,
      isUnitModalOpen: false,
      fontLoaded: false
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'roboto-slab-bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
      'roboto-slab-light': require('./assets/fonts/RobotoSlab-Light.ttf'),
      'roboto-slab-regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
      'roboto-slab-thin': require('./assets/fonts/RobotoSlab-Thin.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  checkAndWarnInvestmentMagnitude() {
    if (this.state.investmentPeriodMagnitude == '') {
      return;
    }
    this.setState({
      hasValidInvestmentMagnitude: validateInvestmentMagnitude(this)
    });
  }
  openUnitPicker() {
    console.log('Open modal');
    this.setState({
      isUnitModalOpen: !this.state.isUnitModalOpen
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1, flexDirection: 'column'}}>
        {
          this.state.fontLoaded ? (
            <View style={styles.container}>

              <Text style={{fontFamily: 'roboto-slab-bold',
                            fontSize: 36, color: '#008000', marginBottom: 10}}>
                BE$T BET
              </Text>

              <Text style={styles.q}>How much would you like to invest?</Text>
              <TextInput
                style={styles.box} textAlign={'center'} placeholder = "$"
                multiline={false} keyboardType="numeric"
                onChangeText={(text) => this.setState({amountToInvest: text})}
                value={this.state.amountToInvest}
              />

              <Text style={styles.q}>How much would you like to have?</Text>
              <TextInput
                style={styles.box} textAlign={'center'} placeholder = "$"
                multiline={false} keyboardType="numeric"
                onChangeText={(text) => this.setState({amountDesired: text})}
                value={this.state.amountDesired}
              />
              <Text style={styles.q}>When would you like to achieve your goal by?</Text>
              <View style={{height: 40, flexDirection: 'row', justifyContent: 'center'}}>
                <TextInput 
                  style={styles.box} textAlign={'center'} placeholder = "#"
                  multiline={false} keyboardType="numeric"
                  onChangeText={(text) => this.setState({investmentPeriodMagnitude: text})}
                  value={this.state.investmentPeriodMagnitude}
                />
                <Text style={styles.dropdown} textAlign={'center'}
                      onPress={this.openUnitPicker.bind(this)}>
                  {this.state.investmentPeriodUnits}
                </Text>
              </View>

              <Modal isVisible={this.state.isUnitModalOpen}
                    style={{backgroundColor: 'white',
                            maxHeight: 200, marginTop: 'auto',
                            justifyContent: 'center', alignItems: "center",
                            borderRadius: 5, borderColor: "rgba(0, 0, 0, 0.1)"}}
                    onBackdropPress={() => this.setState({ isUnitModalOpen: false })}>
                <View style={{width: 100, marginTop:10}}>
                  <Picker
                    selectedValue={this.state.investmentPeriodUnits}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({investmentPeriodUnits: itemValue},
                                    this.checkAndWarnInvestmentMagnitude)}>
                    <Picker.Item style={{fontFamily: 'roboto-slab-regular'}} key="days" label="days" value="days" />
                    <Picker.Item style={{fontFamily: 'roboto-slab-regular'}} key="months" label="months" value="months" />
                  </Picker>
                  <TouchableOpacity onPress={this.openUnitPicker.bind(this)}>
                    <Text style={{fontFamily: 'roboto-slab-regular',
                      fontSize: 12}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <View style={styles.calc}>
              <Button
                  onPress={() => {
                    Alert.alert('You tapped the button!');
                  }}
                  title="Calculate"
              />
              </View>
            </View>
          ) : null
        }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 160,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  box: {
    height: 35,
    width: 120,
    borderWidth: 0,
    backgroundColor: '#efefef',
    margin: 10
  },

  calc: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#007aff'
  },

  q: {
    fontFamily: 'roboto-slab-regular',
    margin: 10
  },

  dropdown: {
    fontFamily: 'roboto-slab-regular', 
    height: 35,
    margin: 10,
    padding: 5,
    maxWidth: 100,
    borderWidth: 0.75,
    borderRadius: 3,
    borderColor: '#007aff'
  }
});
