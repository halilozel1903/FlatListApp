import React, {Component} from 'react';
import {StyleSheet,SafeAreaView} from 'react-native';
import FlatListExample from './FlatListExample';


export default class App extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatListExample></FlatListExample>
      </SafeAreaView>
    );
  }
}



// Style definitions
const styles = StyleSheet.create({
  // root cell
  container: {
    backgroundColor: '#C0C0C0', // only as large as the views inside it.
    flex: 1, // fills the whole screen.
    flexDirection: 'row',
    // row: lay out as a row
    // column: lay out as a column
    // the default is column
  },

});
