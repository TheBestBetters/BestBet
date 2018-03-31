import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToInvest: '',
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
