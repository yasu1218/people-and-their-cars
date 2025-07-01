import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_PERSON } from '../../graphql/queries'

// ============================================================================
// UpdatePerson Component
// This component provides a form to update an existing person's details.
const UpdatePerson = props => {
  const { id, firstName, lastName} = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const [updatePerson] = useMutation(UPDATE_PERSON)

  // ----------------------------------------------------------------
  // Function to handle form submission
  const onFinish = values => {
    const { firstName, lastName } = values

    updatePerson({
      variables: {
        updatePersonId : id,
        firstName,
        lastName
      }
    })
    props.onButtonClick()
  }

  // ----------------------------------------------------------------
  // Render the form for updating a person's details
  const styles = getStyles()
  return (
    <div style={styles.container}>
      <Form
        form={form}
        name='update-person-form'
        layout='inline'
        onFinish={onFinish}
        initialValues={{
          firstName,
          lastName
        }}
      >
        {/* ---------- First name ---------- */}
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please enter a first name.' }]}
          style={styles.formItem}
        >
          <Input placeholder='First name' />
        </Form.Item>
        {/* ---------- Last name ---------- */}
        <Form.Item 
          label='Last Name'
          name='lastName' 
          rules={[{ required: true, message: 'Please enter a last name.' }]}
          style={styles.formItem}
        >
          <Input placeholder='Last name' />
        </Form.Item>
        {/* ---------- Update button ---------- */}      
        <Form.Item 
          shouldUpdate={true}
          style={styles.formItem}
        >
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                form.getFieldError().filter(({ errors }) => errors.length).length
              }
            >
              Update Person
            </Button>
          )}
        </Form.Item>
        {/* ---------- Cancel button ---------- */}
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </div>
  )

}

export default UpdatePerson;


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
  formItem: {
    marginRight: '30px',
    marginBottom: '15px',
  },
});
