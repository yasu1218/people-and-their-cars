import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPerson';
import Persons from './components/lists/Persons';

// Define the Apollo Client to connect to the GraphQL server
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// ==========================================================================
// Render the application
const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <AddPerson />
        <Persons />
      </div>
    </ApolloProvider>

  )
}

export default App;
