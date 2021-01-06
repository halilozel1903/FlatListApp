import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity,TextInput,Dimensions,FlatList} from 'react-native';
import data from './data';
import axios from 'axios';

const {width} = Dimensions.get('window');

export default class FlatListExample extends Component {

	state = {
		text: '',
		contacts: []
  }

  componentDidMount(){
    this.getContacts();
  }
  
  getContacts = async () => {
    const { data: { results: contacts }} = await axios.get('https://randomuser.me/api/?results=15');

    this.setState({
      contacts
    });

  };

  renderContactsItem = ({item, index}) => {
    return(

      <TouchableOpacity style={styles.itemContainer, {backgroundColor: index % 2 == 1 ? '#fafafa' :'' }}>
        <Image
        style={styles.avatar}
        source={{ uri: item.picture.thumbnail }}/>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
          <Text>{item.location.state}</Text>
        </View>
      
      </TouchableOpacity>
    )
  };

  searchFilter = text =>{
	const newData = data.filter(item => {

		const listItem = `${item.name.toLowerCase()} ${item.company.toLowerCase()}`

		return listItem.indexOf(text.toLowerCase()) > -1;
	})

	this.setState({
		contacts: newData
	});

  };

  renderHeader = () => {
	  const {text} = this.state;
    return(
      <View style={styles.searchContainer}>
		<TextInput 
		onChangeText = { text => {

			this.setState({
				text,
			});

			this.searchFilter(text);
		}}
		value={text}
		placeholder="Search" 
		style={styles.searchInput}/>
      </View>
    )
  }

  render() {
    return (
       <FlatList
       ListHeaderComponent={this.renderHeader()}
       renderItem={this.renderContactsItem}
       keyExtractor={item => item.login.uuid}
       data={this.state.contacts}/>
     
    );
  }
}



// Stil tanımlama islemleri
const styles = StyleSheet.create({
  // root hucremizdeki islemler
  container: {
    backgroundColor: '#123456', // viewlerin bulundugu alan kadar.
    flex: 1, // ekranın tamamını kapladı.
    flexDirection: 'row',
    // row : satır olarak hizala
    // column: sütun olarak hizala
    // default değeri sütun olarak hizala
  },
  text:{
    backgroundColor: 'white',
    marginVertical: 40,
    textAlign: 'center',
    paddingVertical: 70,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 40,
    width
  },

  itemContainer:{
    flex:1,
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20
  },

  textContainer:{
    justifyContent: 'space-around',
    marginLeft: 10
  },

  name:{
    fontSize: 16,
  },

  searchContainer:{
    padding: 10
  },

  searchInput:{
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    padding: 10
  }

});
