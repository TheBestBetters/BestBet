import 'expo';
import React from 'react';
import {Picker, PickerIOS, StyleSheet, TextInput, Text, View} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '',
      investmentPeriod: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.amountToInvest}</Text>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({amountToInvest: text})}
          value={this.state.amountToInvest}
        />
        <Text>Investment Period: {this.state.investmentPeriod}</Text>
        <Picker
          style={{height:30, width:100}}
          selectedValue={this.state.investmentPeriod}
          onValueChange={(itemValue, itemIndex) => this.setState({investmentPeriod: itemValue})}>
          <Picker.Item key="java" label="Java" value="java" />
          <Picker.Item key="js" label="JavaScript" value="js" />
        </Picker>
      </View>
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
