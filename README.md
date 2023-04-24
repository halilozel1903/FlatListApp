## Flat List

![FlatList](https://s3-ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/07/08083248/0234f46b-e4f3-4b5b-8ebf-f9a55322b54a.jpg)

A performant interface for rendering basic, flat lists, supporting the most handy features:

- Fully cross-platform.
- Optional horizontal mode.
- Configurable viewability callbacks.
- Header support.
- Footer support.
- Separator support.
- Pull to Refresh.
- Scroll loading.
- ScrollToIndex support.
- Multiple column support.

## Axios

![Axios](https://miro.medium.com/max/1200/1*pj6oDkFSQL7DhSP-9CFAMg.png)

Promise based HTTP client for the browser and node.js

For more details : https://github.com/axios/axios

```react
  getContacts = async () => {
    const { data: { results: contacts }} = await axios.get('https://randomuser.me/api/?results=15');

    this.setState({
      contacts
    });

  };

```

**FlatList** use :

```react
   render() {
    return (
       <FlatList
       ListHeaderComponent={this.renderHeader()}
       renderItem={this.renderContactsItem}
       keyExtractor={item => item.login.uuid}
       data={this.state.contacts}/>
     
    );
  }

```

