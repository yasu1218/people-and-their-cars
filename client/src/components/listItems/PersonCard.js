import Card from 'antd/es/card/Card'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

// ============================================================================
// PersonCard Component
// This component renders a card for a person, allowing for viewing and editing their details.
const PersonCard = props => {

  const [editMode, setEditMode] = useState(false) // State to toggle between edit mode and view mode
  const { id, firstName, lastName } = props // Destructure props to get the person's id, first name, and last name

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
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              id={id}
              firstName={firstName}
              lastName={lastName}
              onClick={handleButtonClick}
            />,
            <RemovePerson id={id} />
          ]}
        >
          {firstName} {lastName}
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
    borderColor: '#888'
  }
});
