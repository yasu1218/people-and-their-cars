import { useMutation } from '@apollo/client';
import { Form, Input, InputNumber, Button, Divider } from 'antd';
import { useEffect, useState } from 'react';

import { ADD_CAR, GET_PERSONS } from '../../graphql/queries';
import PersonSelector from './PersonSelector';


// ============================================================================
// AddCar Component
// This component provides a form to add a new car to the database.
const AddCar = () => {

  // Create a form instance using Ant Design's Form component
  const [form] = Form.useForm();

  // Use a state hook to force a re-render when needed
  const [, forceUpdate] = useState();

  // Define the mutation for adding a new car
  const [addCar] = useMutation(ADD_CAR);

  // Use the useEffect hook to force a re-render when the component mounts
  useEffect(() => {
    forceUpdate({}); // This forces the component to re-render
  }, []);

  // ----------------------------------------------------------------
  // Function to handle form submission
  const onFinish = values => {
    const { year, make, model, price, personId} = values;
    console.log('year, make, model, price, personId', year, make, model, price, personId);

    addCar({
      variables: {
        year,
        make,
        model,
        price,
        personId
      },
      // Update the cache after adding a new car
      update: (cache, { data: { addCar } }) => {
        // Read the existing persons from the cache
        const data = cache.readQuery({ query: GET_PERSONS });
        
        // Write the new car to the cache
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            personsFull: data.personsFull.map(person => {
              // If the person matches the one we just added a car to, add the new car
              if (person.id === personId) {
                return {
                  ...person,
                  cars: [...person.cars, addCar] // Add the new car to the person's cars
                };
              }
              return person; // Otherwise, return the person unchanged
            })
          }
        });
      }
    })
  };

  // ----------------------------------------------------------------
  // Render the form for adding a new car
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Heading divider ---------- */}      
      <Divider style={styles.divider}>Add Car</Divider>
      {/* ---------- Form ---------- */}
      <Form
        form={form}
        name='add-car-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px'}}
      >
        {/* ---------- Year ---------- */}
        <Form.Item 
          label="Year"
          name='year' 
          rules={[{ required: true, message: 'Please input the car model year!' }]}
        >
          <InputNumber placeholder='Year' />
        </Form.Item>
        {/* ---------- Make ---------- */}
        <Form.Item 
          label="Make"
          name='make' 
          rules={[{ required: true, message: 'Please input last make/manufacturer!' }]}
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
          <PersonSelector/>
        </Form.Item>
        {/* ---------- Add Car Button ---------- */}
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) || 
                form.getFieldsError().filter(({ errors}) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCar;

// ============================================================================
// Styles
const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
}); 