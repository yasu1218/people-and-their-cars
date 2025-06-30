import { useMutation } from '@apollo/client'
import { Button, Form, Input, InputNumber } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { UPDATE_CAR, GET_PERSONS } from '../../graphql/queries'
import PersonSelector from './PersonSelector';

// ============================================================================
// UpdateCar Component
// This component provides a form to update an existing car's details.
const UpdateCar = props => {
  const { id, year, make, model, price, personId } = props;
  const oldPersonId = useRef(personId); // Store the old personId to compare with the new one
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR);

  // ----------------------------------------------------------------
  // Function to handle form submission
  const onFinish = values => {
    const { year, make, model, price, personId  } = values;
    updateCar({
      variables: {
        updateCarId: id,
        year,
        make,
        model,
        price,
        personId
      },
      // Update the cache after updating a car
      update: (cache, { data: { updateCar } }) => {
        // Read the existing persons from the cache
        const data = cache.readQuery({ query: GET_PERSONS });
        
        // Write the updated car to the cache
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            personsFull: data.personsFull.map(person => {
              // Case 1: If the personId has changed: 
              if (oldPersonId.current !== personId) {
                // Case 1A: If the person matches the previous personId, remove the car from the previous person.
                if (person.id === oldPersonId.current) {
                  return {
                    ...person,
                    cars: person.cars.filter(car => car.id !== id) // Remove the car from the previous person
                  };
                }
                // Case 1B: Else if the person matches the new personId, add the car to the new person.
                if (person.id === personId) {
                  return {
                    ...person,
                    cars: [...person.cars, updateCar] // Add the updated car to the new person
                  };
                }
              }
              // Case 2: If the personId has not changed, update the car details for the same person.
              if (person.id === personId) {
                return {
                  ...person,
                  cars: person.cars.map(car =>
                    car.id === id ? { ...car, year, make, model, price } : car // Update the car details if it matches the id
                  )
                };
              }
              // Otherwise, return the person unchanged
              return person;
            })
          }
        });



      }

    });
    props.onButtonClick(); // Callback to close the form or update the UI
  };

  // ----------------------------------------------------------------
  // Render the form for updating a car's details
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Form ---------- */}
      <Form
        form={form}
        name='update-car-form'
        layout='inline'
        onFinish={onFinish}
        initialValues={{
          year,
          make,
          model,
          price,
          personId
        }}
      >
        {/* ---------- Year ---------- */}
        <Form.Item 
          label="Year"
          name='year' 
          rules={[{ required: true, message: 'Please input the car model year' }]}
        >
          <InputNumber placeholder='Year' />
        </Form.Item>
        {/* ---------- Make ---------- */}
        <Form.Item 
          label="Make"
          name='make' 
          rules={[{ required: true, message: 'Please input last make/manufacturer' }]}
        >
          <Input placeholder='Make' />
        </Form.Item>
        {/* ---------- Model ---------- */}
        <Form.Item 
          label="Model"
          name='model' 
          rules={[{ required: true, message: 'Please input last model!' }]}
        >
          <Input placeholder='Model' />
        </Form.Item>
        {/* ---------- Price ---------- */}
        <Form.Item 
          label="Price"
          name='price' 
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value === null || value === void 0 ? void 0 : value.replace(/\$\s?|(,*)/g, '')}        
          />
        </Form.Item>
        {/* ---------- Person ID ---------- */}
        <Form.Item 
          label="Person"
          name='personId' 
          rules={[{ required: true, message: 'Please select a person!' }]}
        >
          <PersonSelector personId={personId}/>
        </Form.Item>
        {/* ---------- Submit button ---------- */}
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                (!form.isFieldTouched('year') && !form.isFieldTouched('make') 
                && !form.isFieldTouched('model') && !form.isFieldTouched('price')
                && !form.isFieldTouched('personId')) ||
                form.getFieldError().filter(({ errors }) => errors.length).length
              }
            >
              Update Car
            </Button>
          )}
        </Form.Item>
        {/* ---------- Cancel button ---------- */}
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </div>
  );

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
