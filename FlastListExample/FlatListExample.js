import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity,TextInput,Dimensions,FlatList,ActivityIndicator, Platform} from 'react-native';
import data from './data';
import axios from 'axios';

const {width} = Dimensions.get('window');
const isIOS = Platform.OS == 'ios';

export default class FlatListExample extends Component {


  // first values
	state = {
    text: '',
    page: 1,
    contacts: [],
    allContacts: [],
    loading: true,
    refreshing: false
  }

  constructor(props){
    super(props);
    this.duringMomentum = false;
  }

  componentDidMount(){
    this.getContacts();
  }
  
  // API component
  getContacts = async () => {

    // paging
    this.setState({
      loading: true,
    });
    
    const { data: { results: contacts }} = await axios.get(`https://randomuser.me/api/?results=15&page=${this.state.page}`);
    const users = [...this.state.contacts, ...contacts]; // ... -> array'i degil icindeki degerleri yerlestirir.

    // refresh islemi yapildiginda 
    if(this.state.refreshing){
      users.reverse(); // ters cevir. En ustte yeni gelenleri goster.
    }

    // new values
    this.setState({
      contacts: users,
      allContacts: contacts,
      loading: false,
      refreshing: false
    });

  };

  // daha fazlasi yukleme
  loadMore = () => {
    if(!this.duringMomentum){
      this.setState({
        page: this.state.page + 1,
      }, () => {
        this.getContacts();
      });
      this.duringMomentum = false;
    }

  };


  // refresh islemleri
  onRefresh = () => {
    this.setState({
      page:  1,
      refreshing: true
    }, () => {
      this.getContacts();
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

  // arama filtreleme
  searchFilter = text =>{
	const newData = this.state.allContacts.filter(item => {

    const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`

		return listItem.indexOf(text.toLowerCase()) > -1;
	})

	this.setState({
		contacts: newData
	});

  };

  // header area - search inputText
  renderHeader = () => {
	  const {text} = this.state;
    return(
      <View style={styles.searchContainer}>
    <TextInput 
    onFocus = {() => this.duringMomentum = true}
    onBlur = {() => this.duringMomentum = false}
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

  // indicator visibility
  renderFooter = () => {
    if(!this.state.loading) return null;
    return(
      <View style={{paddingVertical: 20}}>
        {/* indicator settings */}
        <ActivityIndicator size="large" color="green"/> 
      </View>
    )
  };

  render() {
    return (
       <FlatList
       ListFooterComponent={this.renderFooter()}
       ListHeaderComponent={this.renderHeader()}
       renderItem={this.renderContactsItem}
       keyExtractor={item => item.login.uuid}
       data={this.state.contacts}

       onEndReached={this.loadMore}
       onEndReachedThreshold={ isIOS ? 0: .2} // ust tarafa dogru atiyor  
       
       refreshing={this.state.refreshing}
       onRefresh={this.onRefresh}
       />

      
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
