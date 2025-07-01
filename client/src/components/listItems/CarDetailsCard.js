import { Card, Descriptions } from 'antd'

// ============================================================================
// CarDetailsCard Component
// This component renders a card for a car, listing the car details. This is a view-only component.
const CarDetailsCard = props => {

  const { id, index, year, make, model, price } = props; // Destructure props to get car details
  // console.log('[DEBUG][CarDetailsCard] year: ', year);

  const descriptionItems = [
    { key: '1', label: 'Year', children: year },
    { key: '2', label: 'Make', children: make },
    { key: '3', label: 'Model', children: model },
    { key: '4', label: 'Price', children: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(price) }
  ];


  // ----------------------------------------------------------------
  // Render the person card
  const styles = getStyles()
  return (
    <Card
      title={`Car #${index}`}
      style={styles.card}
    >
      <Descriptions
        bordered
        column={1}
        size='middle'
        items={descriptionItems}
      />
    </Card>
  )
}

export default CarDetailsCard;


// ============================================================================
// Styles for this component
const getStyles = () => ({
  card: {
    borderColor: '#888',
    backgroundColor: '#f0f0ff',
  }
});
