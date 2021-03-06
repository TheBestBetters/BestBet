import { Font } from 'expo';
import React, { Component } from 'react';
import {
  Button, Keyboard, Picker, PickerIOS, StyleSheet, TextInput, Text,
  TouchableWithoutFeedback, TouchableOpacity, View
} from 'react-native';

import Modal from "react-native-modal";
import { StackNavigator } from 'react-navigation';

const ALLOWABLE_MONTHS = 12;
const ALLOWABLE_DAYS = 366;
const ALLOWABLE_WEEKS = 52;

// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   Calculate: { screen: CalculateScreen },
// });

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

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '',
      amountDesired: '',
      investmentPeriodMagnitude: '',
      investmentPeriodUnits: 'days',
      hasValidInvestmentMagnitude: true,
      isUnitModalOpen: false,
      fontLoaded: false,
      // isErrorModalOpen: false
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

  goToCalculate() {
    this.props.navigation.navigate('Calculate', {
      toInvest: this.state.amountToInvest,
      desired: this.state.amountDesired,
      timeframe: this.state.investmentPeriodMagnitude,
      daymonth: this.state.investmentPeriodUnits,
    })    
  }

  satisfiedConditions() {
    if (this.state.amountToInvest < this.state.amountDesired && this.state.amountToInvest > 0) {
      if (this.state.amountToInvest != '' && this.state.amountDesired != '' && this.state.investmentPeriodMagnitude != '') {
        if (!isNaN(this.state.amountToInvest) && !isNaN(this.state.amountDesired) && !isNaN(this.state.investmentPeriodMagnitude)) {
          return true;
        }  
      }
    }
    //ErrorScreen.displayErrorModal();
    return false;
  }

  // displayErrorModal() {
  //   this.state.isErrorModalOpen = true;

  //   // render() {
  //   //   return(
  //   //     <Modal animationType = {"slide"} isVisible={this.state.isErrorModalOpen}
  //   //           style={{backgroundColor: 'white',
  //   //                 maxHeight: 200, marginTop: 'auto',
  //   //                 justifyContent: 'center', alignItems: "center",
  //   //                 borderRadius: 5, borderColor: "rgba(0, 0, 0, 0.1)"}}
  //   //           onBackdropPress={() => this.setState({ isErrorModalOpen: false })}>
  //   //       <View style={{width: 100, marginTop:10}}>
  //   //         <Text>You must enter a valid input</Text>
  //   //       </View>
  //   //     </Modal>        
  //   //   )
  //   // }


  // }

  fetchData() {
    fetch('https://bestbets-199811.appspot.com', {
      method: 'GET',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        principle: this.state.amountToInvest,
        target: this.state.amountDesired,
        term: this.state.investmentPeriodMagnitude,
      }),
    });
  }

  render() {
    //const { navigate } = this.props.navigation;
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

              <Text style={styles.q}>How much would you like to gain?</Text>
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
                  title="Calculate"
                  onPress={() => 
                    {this.satisfiedConditions() ? this.goToCalculate() : null}
                  }
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

class CalculateScreen extends React.Component {
  static navigationOptions = {
    title: 'Calculate',
    headerStyle: {
      backgroundColor: '#008000',
    },
    headerTintColor: 'white'
  };
  render() {
    const { params } = this.props.navigation.state;
    const toInvest = params ? params.toInvest : null;
    const desired = params ? params.desired : null;
    const timeframe = params ? params.timeframe : null;
    const daytime = params ? params.daymonth : null;

    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'roboto-slab-bold',
                            fontSize: 18, color: '#008000', padding: 20}}>
          With ${toInvest}, and to achieve your goal of ${desired} in {timeframe} {daytime}, 
          here is your best bet:
        </Text>
        <Text>Loading...</Text>
        <Text style={{fontFamily: 'roboto-slab-bold',
                            fontSize: 18, color: '#008000', padding: 20}}>
          To improve your odds, you need to either reduce your target or increase the time period.
        </Text>
        <View style={styles.calc}>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        </View>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Calculate: {
      screen: CalculateScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'red',
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
    padding: 7,
    maxWidth: 100,
    borderWidth: 0.75,
    borderRadius: 3,
    borderColor: '#007aff'
  }
});
