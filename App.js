import 'expo';
import React from 'react';
import {
  Keyboard, Picker, PickerIOS, StyleSheet, TextInput, Text,
  TouchableWithoutFeedback, View
} from 'react-native';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '',
      amountDesired: '',
      investmentPeriodMagnitude: '',
      investmentPeriodUnits: '',
      hasValidInvestmentMagnitude: true
    }
  }
  checkAndWarnInvestmentMagnitude() {
    if (this.state.investmentPeriodMagnitude == '') {
      return;
    }
    this.setState({
      hasValidInvestmentMagnitude: validateInvestmentMagnitude(this)
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text>What is the amount that you want to invest?</Text>
          <TextInput
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            multiline={false} keyboardType="numeric"
            onChangeText={(text) => this.setState({amountToInvest: text})}
            value={this.state.amountToInvest}
          />
          <Text>What is the amount that you want to have?</Text>
          <TextInput
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            multiline={false} keyboardType="numeric"
            onChangeText={(text) => this.setState({amountDesired: text})}
            value={this.state.amountDesired}
          />
          {/* <View style={{flex: 1, flexDirection: 'row'}}> */}
            <Text>How long are you willing to invest?</Text>
            <TextInput
              style={{height: 40, width: 100, borderColor: this.state.hasValidInvestmentMagnitude ? 'gray' : 'red' , borderWidth: 1}}
              multiline={false} keyboardType="numeric"
              onChangeText={(text) => this.setState({investmentPeriodMagnitude: text})}
              value={this.state.investmentPeriodMagnitude}
            />
            <Picker
              style={{ width: 100 }} mode="dropdown"
              selectedValue={this.state.investmentPeriodUnits}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({investmentPeriodUnits: itemValue},
                              this.checkAndWarnInvestmentMagnitude)}>
              <Picker.Item key="days" label="days" value="days" />
              <Picker.Item key="weeks" label="weeks" value="weeks" />
              <Picker.Item key="months" label="months" value="months" />
            </Picker>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
