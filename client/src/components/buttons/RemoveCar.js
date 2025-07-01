import { DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PERSONS, REMOVE_CAR } from '../../graphql/queries'
import filter from 'lodash.filter'

// ============================================================================
// RemoveCar Component
// This component provides a button to remove a car from the database.
const RemoveCar = ({ id }) => {

  // ----------------------------------------------------------------
  // Define the mutation for removing a car
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      // Update the cache after removing a car: 
      // Step 1: Read the existing persons and cars from the cache
      const { personsFull } = cache.readQuery({ query: GET_PERSONS });
      // Step 2: Write the new persons & cars to the cache
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          personsFull: personsFull.map(person => {
            // For each person, filter out the car that was removed
            return {
              ...person,
              cars: filter(person.cars, car => car.id !== removeCar.id)
            }
          })
        } 
      });
      // Step 3: Evict the car entry from cache (seems to be optional, but adding to get rid of console warnings)
      cache.evict({ id: cache.identify({ __typename: 'Car', id: removeCar.id }) });
    }
  });

  // ----------------------------------------------------------------
  // Function to handle the button click event
  const handleButtonClick = () => {
    // Show a confirmation dialog before deleting the person
    let result = window.confirm('Are you sure you want to delete this car?')
    // If the user confirms, call the removePerson mutation
    if (result) {
      console.log('Removing car with id:', id);
      removeCar({
        variables: { removeCarId : id }
      })
    }
  }

  // ----------------------------------------------------------------
  // Render the delete button with an icon
  return <DeleteOutlined onClick={handleButtonClick} key='delete' style={{ color: 'red' }} />
}

export default RemoveCar;
