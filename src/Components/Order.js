import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap'; // Import Bootstrap components
import { getOrders, getDeliveryBoys, assignDeliveryBoy } from '../utilis/appService'; // Import from the service

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoys, setSelectedDeliveryBoys] = useState({}); // Store selected delivery boys for each order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);

        const deliveryBoysData = await getDeliveryBoys();
        setDeliveryBoys(deliveryBoysData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectDeliveryBoy = (orderId, deliveryBoyId) => {
    setSelectedDeliveryBoys(prev => ({
      ...prev,
      [orderId]: deliveryBoyId, // Update the selected delivery boy for this order
    }));
  };

  const handleAssignDeliveryBoy = async (orderId) => {
    const deliveryBoyId = selectedDeliveryBoys[orderId]; // Get the delivery boy ID from state
    if (!deliveryBoyId) {
      alert('Please select a delivery boy'); // Prompt to select a delivery boy
      return;
    }

    try {
      await assignDeliveryBoy(orderId, deliveryBoyId);
      alert('Delivery boy assigned successfully');
      // Optionally, re-fetch orders to update the UI
      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error assigning delivery boy:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Delivery Boy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                <Form.Select
                  onChange={(e) => handleSelectDeliveryBoy(order._id, e.target.value)}
                  defaultValue={order.deliveryBoy ? order.deliveryBoy._id : ''}
                >
                  <option value="" disabled>Select Delivery Boy</option>
                  {deliveryBoys.map(boy => (
                    <option key={boy._id} value={boy._id}>
                      {boy.name} - {boy.isAvailable ? 'Available' : 'Not Available'}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button 
                  variant="primary" 
                  onClick={() => handleAssignDeliveryBoy(order._id)}
                >
                  Assign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
