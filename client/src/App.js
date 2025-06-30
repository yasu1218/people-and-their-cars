import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Import screens
import Home from './screens/Home';
import Show from './screens/Show';

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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/:id" element={<Show />} />
        </Routes>
      </Router>
    </ApolloProvider>

  )
}

export default App;
