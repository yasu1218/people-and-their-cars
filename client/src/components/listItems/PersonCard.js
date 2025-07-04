import Card from 'antd/es/card/Card'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import CarCard from './CarCard'
import { Link } from 'react-router-dom'

// ============================================================================
// PersonCard Component
// This component renders a card for a person, allowing for viewing and editing their details.
const PersonCard = props => {

  const [editMode, setEditMode] = useState(false) // State to toggle between edit mode and view mode
  const { id, firstName, lastName, cars } = props // Destructure props to get the person's id, first name, last name, and array of cars

  // ----------------------------------------------------------------
  // Function to toggle edit mode
  // If editMode is true, it will switch to view mode; otherwise, it will switch to edit mode
  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  // ----------------------------------------------------------------
  // Render the person card
  const styles = getStyles()
  return (
    <div style={styles.container}>
      {/* Toggle between edit mode and view mode */}
      {/* If editMode is true, show the UpdatePerson form; otherwise, show the Card  */}
      {editMode ? (
        <Card style={styles.card}>
          <UpdatePerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleButtonClick}
          />
        </Card>
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={[
            <EditOutlined onClick={handleButtonClick}/>,
            <RemovePerson id={id} />
          ]}
        >
          {/* ---------- Loop through the cars owned by the person ---------- */}
          {!cars || cars.length === 0 ? (
            <p>{`${firstName} ${lastName}`} does not own any car.</p>
          ) : (
            cars.map( (car) => (
              <CarCard 
                key={car.id}
                id={car.id}
                year={car.year}
                make={car.make}
                model={car.model}
                price={car.price}
                personId={id}
              />
            ))
          )}
          {/* ---------- Link to the Show (details) screen ---------- */}
          <Link to={`/people/${id}`}>
            <p style={{ color: '#1890ff' }}>LEARN MORE</p>
          </Link>
        </Card>
      )}
    </div>
  )
}

export default PersonCard;


// ============================================================================
// Styles for the PersonCard component
const getStyles = () => ({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderColor: '#888',
    backgroundColor: '#f0f0ff',
  }
});
