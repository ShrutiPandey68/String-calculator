import React, { useState, useEffect } from 'react';
import { getDeliveryBoys } from '../utilis/appService'; // Import from the service

const DeliveryBoys = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const boysData = await getDeliveryBoys();
        setDeliveryBoys(boysData);
      } catch (error) {
        console.error('Error fetching delivery boys:', error);
        setError('Failed to fetch delivery boys');
      }
    };

    fetchDeliveryBoys();
  }, []);

  return (
    <div>
      <h1>Delivery Boys</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <table>
        <thead>
          <tr>
            <th>Delivery Boy ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveryBoys.map(boy => (
            <tr key={boy._id}>
              <td>{boy._id}</td>
              <td>{boy.name}</td>
              <td>{boy.isAvailable ? 'Available' : 'Busy'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryBoys;
