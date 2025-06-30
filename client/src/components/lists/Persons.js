import { useQuery } from '@apollo/client'
import { List, Divider } from 'antd'
import { GET_PERSONS } from '../../graphql/queries'  // Import the GraphQL query to get persons
import PersonCard from '../listItems/PersonCard'

// ============================================================================
// Persons Component
// This component fetches and displays a list of persons from the GraphQL server.
const Persons = () => {

  // Use the useQuery hook to fetch persons from the GraphQL server
  const { loading, error, data } = useQuery(GET_PERSONS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // console.log('[DEBUG][Persons] data: ', data);


  // ----------------------------------------------------------------
  // Render the list of persons
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Divider for the Records section ---------- */}
      <Divider style={styles.divider}>Records</Divider>
      {/* ---------- List of persons ---------- */}
      <List style={styles.list}>
        {data.personsFull.map(({ id, firstName, lastName }) => (
          <List.Item key={id} style={{ width: '100%' }}>
            {/* ---------- Individual Cards ---------- */}
            <PersonCard id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Persons;

// ============================================================================
// Styles for the Persons component
const getStyles = () => ({
  container: {
    width: '100%',
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px',
    borderColor: '#888',
    fontSize: '20px',
    fontWeight: 'bold',
  },  
  list: {
    width: '100%',
    margin: '0 auto'
  }
});

