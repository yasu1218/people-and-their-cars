import React from 'react';
import { Divider } from 'antd';
// Import components
import Title from '../components/layout/Title';
import AddPerson from '../components/forms/AddPerson';
import AddCar from '../components/forms/AddCar';
import Persons from '../components/lists/Persons';

// ============================================================================
// Home Screen
// This screen serves as the main page of the application, displaying the title,
// a form to add a new person, a form to add a new car, and a list of persons.
const Home = () => {

  const pageTitle = 'People and Their Cars'; // Title text

  // ----------------------------------------------------------------
  // Render the Home screen
  return (
      <div className='App'>
        <Title title={pageTitle} />
        <AddPerson />
        <AddCar />
        <Persons />
      </div>
  );
};

export default Home;
