import Card from 'antd/es/card/Card'
import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

// ============================================================================
// CarCard Component
// This component renders a card for a car, allowing for viewing and editing its details.
const CarCard = props => {

  const [editMode, setEditMode] = useState(false) // State to toggle between edit mode and view mode
  const { id, year, make, model, price, personId } = props // Destructure props to get the car's id, year, make, model, price, and personId

  // ----------------------------------------------------------------
  // Function to toggle edit mode
  // If editMode is true, it will switch to view mode; otherwise, it will switch to edit mode
  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  // ----------------------------------------------------------------
  // Render the car card
  const styles = getStyles()
  return (
    <div style={styles.container}>
      {/* Toggle between edit mode and view mode */}
      {/* If editMode is true, show the UpdateCar form; otherwise, show the Card  */}
      {editMode ? (
        <UpdateCar/>
      ) : (
        <Card
          title={`${year} ${make} ${model} -> $${price}`}
          style={styles.card}
          actions={[
            <EditOutlined
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
              onClick={handleButtonClick}
            />,
            <RemoveCar id={id} />
          ]}
        >
        </Card>
      )}
    </div>
  )
}

export default CarCard;


// ============================================================================
// Styles for the PersonCard component
const getStyles = () => ({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    borderColor: '#AAA',
    backgroundColor: '#f0fff0',
    marginBottom: '10px',
  }
});
