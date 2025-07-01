import { useMutation } from '@apollo/client';
import { Form, Input, InputNumber, Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { ADD_CAR, GET_PERSONS, GET_PERSONS_LIST } from '../../graphql/queries';
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

    // Call the addCar mutation with the form values & update the cache
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
    });

    // Reset the form fields after submission
    form.resetFields();
  };


  // ----------------------------------------------------------------
  // Check if there are any persons in the database

  // Fetch the list of persons to determine if any person exists
  const { loading, error, data } = useQuery(GET_PERSONS_LIST);
  if (loading) return 'Loading...';
  if (error) return `[ERROR][AddCar]Error loading people: ${error.message}`;
  const persons = data?.personsList || [];
  
  // ----------------------------------------------------------------
  // Render the form for adding a new car
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Heading divider ---------- */}      
      <Divider style={styles.divider}>Add Car</Divider>
      {/* Display message if no person is available. Otherwise show the form. */}
      { persons.length === 0 ? (
        <p>Please add a person first before adding a car.</p>
      ) : (
        // {/* ---------- Form ---------- */}
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
            rules={[{ required: true, message: 'Please input the car model year.' }]}
            style={styles.formItem}
          >
            <InputNumber placeholder='Year' />
          </Form.Item>
          {/* ---------- Make ---------- */}
          <Form.Item 
            label="Make"
            name='make' 
            rules={[{ required: true, message: 'Please input last make/manufacturer.' }]}
            style={styles.formItem}
          >
            <Input placeholder='Make' />
          </Form.Item>
          {/* ---------- Model ---------- */}
          <Form.Item 
            label="Model"
            name='model' 
            rules={[{ required: true, message: 'Please input last model.' }]}
            style={styles.formItem}
          >
            <Input placeholder='Model' />
          </Form.Item>
          {/* ---------- Price ---------- */}
          <Form.Item 
            label="Price"
            name='price' 
            rules={[{ required: true, message: 'Please input the price.' }]}
            style={styles.formItem}
          >
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value === null || value === void 0 ? void 0 : value.replace(/\$\s?|(,*)/g, '')}
              style={styles.priceInput}
            />
          </Form.Item>
          {/* ---------- Person ID ---------- */}
          <Form.Item 
            label="Person"
            name='personId' 
            rules={[{ required: true, message: 'Please select a person.' }]}
            style={styles.formItem}
          >
            <PersonSelector/>
          </Form.Item>
          {/* ---------- Add Car Button ---------- */}
          <Form.Item 
            shouldUpdate={true}
            style={styles.formItem}
          >
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
      )}
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
  formItem: {
    marginRight: '30px',
    marginBottom: '15px',
  },
  priceInput: {
    minWidth: '130px',
  },
}); 