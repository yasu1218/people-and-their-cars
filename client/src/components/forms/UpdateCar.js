// to be updated
const UpdateCar = props => {
  return (
    <div>
      {/* UpdateCar form will be implemented here */}
      <h2>Update Car Form</h2>
      <p>Form to update car details for ID: {props.id}</p>
    </div>
  )

}

export default UpdateCar;


// ============================================================================
// Styles
const getStyles = () => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
