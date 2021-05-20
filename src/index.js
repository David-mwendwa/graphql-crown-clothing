import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';     

// Establish the connection to the backend
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
})

// Create cache - local storage for the app
const cache = new InMemoryCache();

// Make the client
const client =  new ApolloClient({    
  link: httpLink,
  cache
})

// Testing the query
client.query({
  query: gql`
    {
      getCollectionsByTitle(title: "hats") {
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
    }
  `,
}).then(res => console.log(res)); 

ReactDOM.render(
  <ApolloProvider>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
