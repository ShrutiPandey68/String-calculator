// src/appService.js

// Base URL configuration
const BASE_URL = 'http://localhost:3001/api';

// Fetch orders
export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await response.json();
};

// Fetch delivery boys
export const getDeliveryBoys = async () => {
  const response = await fetch(`${BASE_URL}/deliveryboys`);
  if (!response.ok) {
    throw new Error('Failed to fetch delivery boys');
  }
  return await response.json();
};

// Assign delivery boy to an order
export const assignDeliveryBoy = async (orderId, deliveryBoyId) => {
  const response = await fetch(`${BASE_URL}/orders/${orderId}/assign`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deliveryBoyId }),
  });

  if (!response.ok) {
    throw new Error('Failed to assign delivery boy');
  }

  return await response.json();
};
