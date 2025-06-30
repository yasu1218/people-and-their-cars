import React from 'react';
import { Select, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PERSONS_LIST } from '../../graphql/queries';

// ============================================================================
// PersonSelector Component
// This component provides a dropdown to select a person from a list.
const PersonSelector = ({ personId, onChange, style = {} }) => {

  // Use the useQuery hook to fetch the list of persons
  const { loading, error, data } = useQuery(GET_PERSONS_LIST);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Map the fetched data to the format required by the Select component
  const options = data.personsList.map(person => ({
    value: person.id,
    label: `${person.firstName} ${person.lastName}`
  }));

  // ----------------------------------------------------------------
  // Render the person selector dropdown
  return (
    <Select
      defaultValue={personId}
      onChange={onChange}
      style={{ style }}
      options={options}
      placeholder="Select a person"
    />
  );
};

export default PersonSelector;
