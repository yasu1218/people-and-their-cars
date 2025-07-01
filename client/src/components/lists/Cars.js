import { List, Divider, Row, Col } from 'antd'
import CarDetailsCard from '../listItems/CarDetailsCard'

// ============================================================================
// Cars Component
// This component displays a list of cars owned by the person passed as a prop.
const Cars = props => {

  const { cars } = props; // Destructure props to get the person object
  // console.log('[DEBUG][Cars] cars: ', cars);


  // ----------------------------------------------------------------
  // Render the list of cars
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Divider for the Records section ---------- */}
      <Divider style={styles.divider}>Cars Owned</Divider>
      {/* ---------- List of cars ---------- */}
      <div style={styles.carList}>
        {cars.map((car, index) => (
          <CarDetailsCard key={car.id} index={index + 1} year={car.year} make={car.make} model={car.model} price={car.price} />
        ))}
      </div>
    </div>
  )
}

export default Cars;

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
  carList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },

});

