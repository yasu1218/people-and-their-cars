import { useMutation } from '@apollo/client';
import { Form, Input, Button, Divider } from 'antd';
import { useEffect, useState } from 'react';

import { ADD_PERSON, GET_PERSONS, GET_PERSONS_LIST } from '../../graphql/queries';

// ============================================================================
// AddPerson Component
// This component provides a form to add a new person to the list of persons.
const AddPerson = () => {

  // Create a form instance using Ant Design's Form component
  const [form] = Form.useForm();

  // Use a state hook to force a re-render when needed
  const [, forceUpdate] = useState();

  // Define the mutation for adding a new person
  const [addPerson] = useMutation(ADD_PERSON);


  // Use the useEffect hook to force a re-render when the component mounts
  useEffect(() => {
    forceUpdate({}); // This forces the component to re-render
  }, []);

  // ----------------------------------------------------------------
  // Function to handle form submission
  const onFinish = values => {
    const {firstName, lastName} = values;

    console.log('firstName', firstName);
    console.log('lastName', lastName);

    addPerson({
      variables: {
        firstName: firstName,
        lastName: lastName,
      },
      // Update the cache after adding a new person
      update: (cache, { data: { addPerson } }) => {
        // Read the existing persons from the cache
        const data = cache.readQuery({ query: GET_PERSONS });
        
        // Write the new person to the cache
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            personsFull: [...data.personsFull, addPerson], // Append the new person to the existing list
          }
        });

        // Also update the GET_PERSONS_LIST cache
        try {
          const existing = cache.readQuery({ query: GET_PERSONS_LIST });

          if (existing?.personsList) {
            cache.writeQuery({
              query: GET_PERSONS_LIST,
              data: {
                personsList: [...existing.personsList, addPerson]
              }
            });
          }
        } catch (error) {
          console.warn('Unable to update cache for GET_PERSONS_LIST:', error.message);
        }
      }
    });

    // Reset the form fields after submission
    form.resetFields();
    
  };

  // ----------------------------------------------------------------
  // Render the form for adding a new person
  const styles = getStyles();
  return (
    <div style={styles.container}>
      {/* ---------- Heading divider ---------- */}      
      <Divider style={styles.divider}>Add Person</Divider>
      {/* ---------- Form ---------- */}

      <Form
        form={form}
        name='add-person-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px'}}>
          {/* ---------- First Name ---------- */}
          <Form.Item 
            label="First Name"
            name='firstName' 
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input placeholder='First name' />
          </Form.Item>
          {/* ---------- Last Name ---------- */}
          <Form.Item 
            label="Last Name"
            name='lastName' 
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input placeholder='Last name' />
          </Form.Item>
          {/* ---------- Add Person button ---------- */}
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
                Add Person
              </Button>
            )}
          </Form.Item>
      </Form>
    </div>
  )
}

export default AddPerson;

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