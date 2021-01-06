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



// Stil tanımlama islemleri
const styles = StyleSheet.create({
  // root hucremizdeki islemler
  container: {
    backgroundColor: '#C0C0C0', // viewlerin bulundugu alan kadar.
    flex: 1, // ekranın tamamını kapladı.
    flexDirection: 'row',
    // row : satır olarak hizala
    // column: sütun olarak hizala
    // default değeri sütun olarak hizala
  },

});
