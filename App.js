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
                            fontSize: 36, color: '#008000'}}>
                BE$T BET
              </Text>
              <Text style={{ fontFamily: 'roboto-slab-regular' }}> What is the amount that you want to invest?</Text>
              <TextInput
                style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1,
                        paddingBottom: 10}}
                multiline={false} keyboardType="numeric"
                onChangeText={(text) => this.setState({amountToInvest: text})}
                value={this.state.amountToInvest}
              />
              <Text style={{ fontFamily: 'roboto-slab-regular' }} >What is the amount that you want to have?</Text>
              <TextInput
                style={{fontFamily: 'roboto-slab-regular', height: 40,
                        width: 100, borderColor: 'gray', borderWidth: 1,
                        paddingBottom: 10}}
                multiline={false} keyboardType="numeric"
                onChangeText={(text) => this.setState({amountDesired: text})}
                value={this.state.amountDesired}
              />
              <Text style={{ fontFamily: 'roboto-slab-regular' }} >How long are you willing to invest?</Text>
              <View style={{height: 40, flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                <TextInput
                  style={{fontFamily: 'roboto-slab-regular',
                    flex: 1, height: 40, borderWidth: 1, maxWidth: 100,
                    borderColor: this.state.hasValidInvestmentMagnitude ? 'gray' : 'red'}}
                  multiline={false} keyboardType="numeric"
                  onChangeText={(text) => this.setState({investmentPeriodMagnitude: text})}
                  value={this.state.investmentPeriodMagnitude}
                />
                <Text style={{fontFamily: 'roboto-slab-regular', flex: 1,
                              height: 40, paddingTop: 10, paddingLeft: 10,
                              maxWidth: 100}}
                      onPress={this.openUnitPicker.bind(this)}>
                  {this.state.investmentPeriodUnits}
                </Text>
              </View>
              <Modal isVisible={this.state.isUnitModalOpen}
                    style={{backgroundColor: 'white', paddingLeft: 22, paddingRight: 22,
                            paddingTop: 0, paddingBottom: 0,
                            maxHeight: 250, marginTop: 'auto',
                            justifyContent: "center", alignItems: "center",
                            borderRadius: 4, borderColor: "rgba(0, 0, 0, 0.1)"}}
                    onBackdropPress={() => this.setState({ isUnitModalOpen: false })}>
                <View>
                  <Picker
                    style={{width: 100, bottom: 0}}
                    selectedValue={this.state.investmentPeriodUnits}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({investmentPeriodUnits: itemValue},
                                    this.checkAndWarnInvestmentMagnitude)}>
                    <Picker.Item style={{fontFamily: 'roboto-slab-regular'}} key="days" label="days" value="days" />
                    <Picker.Item style={{fontFamily: 'roboto-slab-regular'}} key="months" label="months" value="months" />
                  </Picker>
                  <TouchableOpacity onPress={this.openUnitPicker.bind(this)}>
                    <Text style={{fontFamily: 'roboto-slab-regular',
                      fontSize: 12, marginLeft: 'auto', marginRight: 'auto',
                      marginBottom: 10}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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
    paddingTop: 140,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
