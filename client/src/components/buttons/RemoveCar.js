import { DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
//import { GET_PERSONS, REMOVE_PERSON } from '../../graphql/queries'
import filter from 'lodash.filter'

// ============================================================================
// RemovePerson Component
// This component provides a button to remove a person from the list of persons.
const RemoveCar = ({ id }) => {

  // ----------------------------------------------------------------
  // Define the mutation for removing a person
  

  // ----------------------------------------------------------------
  // Function to handle the button click event
  const handleButtonClick = () => {
    console.log('[DEBUG][RemoveCar] handleButtonClick called with id:', id);
  }

  // ----------------------------------------------------------------
  // Render the delete button with an icon
  return <DeleteOutlined onClick={handleButtonClick} key='delete' style={{ color: 'red' }} />
}

export default RemoveCar;
