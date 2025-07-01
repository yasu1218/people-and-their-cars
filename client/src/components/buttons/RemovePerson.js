import { DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PERSONS, REMOVE_PERSON, GET_PERSONS_LIST } from '../../graphql/queries'
import filter from 'lodash.filter'

// ============================================================================
// RemovePerson Component
// This component provides a button to remove a person from the list of persons.
const RemovePerson = ({ id }) => {

  // ----------------------------------------------------------------
  // Define the mutation for removing a person
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      // Update the cache after removing a person: 
      // Step 1: Read the existing persons from the cache
      const { personsFull } = cache.readQuery({ query: GET_PERSONS })
      // Step 2: Write the new persons to the cache
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          personsFull: filter(personsFull, p => {
            return p.id !== removePerson.id
          })
        }
      });
      // Step 3: Update the cache for the list of persons
      const { personsList } = cache.readQuery({ query: GET_PERSONS_LIST })
      cache.writeQuery({
        query: GET_PERSONS_LIST,
        data: {
          personsList: filter(personsList, p => {
            return p.id !== removePerson.id
          })
        }
      });
      // Step 4: Evict entry from cache (seems to be optional, but adding to get rid of console warnings)
      cache.evict({ id: `Person:${removePerson.id}` });
    }
  })

  // ----------------------------------------------------------------
  // Function to handle the button click event
  const handleButtonClick = () => {
    // Show a confirmation dialog before deleting the person
    let result = window.confirm('Are you sure you want to delete this person?')
    // If the user confirms, call the removePerson mutation
    if (result) {
      console.log('Removing person with id:', id);
      removePerson({
        variables: { removePersonId : id }
      })
    }
  }

  // ----------------------------------------------------------------
  // Render the delete button with an icon
  return <DeleteOutlined onClick={handleButtonClick} key='delete' style={{ color: 'red' }} />
}

export default RemovePerson;
