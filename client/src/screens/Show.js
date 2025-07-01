import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Spin } from 'antd';
import { GET_PERSON } from '../graphql/queries';
import Title from '../components/layout/Title';
import Cars from '../components/lists/Cars';

// ============================================================================
// Show Screen
// This screen displays the details of a person, including their name and the cars they own.
const Show = () => {
  const { id } = useParams();
  // console.log('[DEBUG][Show] Person ID:', id);

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id }
  });

  if (loading) return <Spin />;
  if (error) return <div>Error loading person.</div>;

  const { firstName, lastName, cars } = data.person;

  const pageTitle = `${firstName} ${lastName}`; // Title text

  // ----------------------------------------------------------------
  // Render the Show screen 
  const styles = getStyles();
  return (
    <div className="App">
      {/* ---------- Heading ---------- */}
      <Title title={pageTitle} />
      {/* ---------- List of cars ---------- */}
      { cars.length === 0 ? (
        <p>{`${firstName} ${lastName}`} does not own any car.</p>
      ) : (
        <Cars cars={cars} />
      )}
      {/* ---------- Link to main screen ---------- */}
      <Link to={`/`} style={styles.linkStyle}>
        <p style={{ color: '#1890ff' }}>GO BACK HOME</p>
      </Link>
    </div>
  );
};

export default Show;

// ============================================================================
// Styles for the component
const getStyles = () => ({
  linkStyle: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#1890ff',
  },
});