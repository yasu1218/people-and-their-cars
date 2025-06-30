import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Spin, Typography } from 'antd';
import { GET_PERSON } from '../graphql/queries';

const { Title, Text } = Typography;

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

  // ----------------------------------------------------------------
  // Render the Show screen 
  // TODO: Update the styles
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>{firstName} {lastName}</Title>
      <Title level={4}>Cars</Title>
      {cars.length === 0 ? (
        <Text type="secondary">No cars owned.</Text>
      ) : (
        cars.map(car => (
          <Card key={car.id} style={{ marginBottom: 12 }}>
            <div>{car.year} {car.make} {car.model}</div>
            <div>${car.price.toFixed(2)}</div>
          </Card>
        ))
      )}
      <Link to="/">
        <Text type="primary">Back to Home</Text>
      </Link>
    </div>
  );
};

export default Show;
