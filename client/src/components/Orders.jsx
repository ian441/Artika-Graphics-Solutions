import React, { useState, useEffect } from 'react';
import { getUserOrders, updateOrderStatus } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch {
      setError('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await updateOrderStatus(id, status);
      if (response.success) {
        fetchOrders();
      } else {
        setError('Failed to update order status');
      }
    } catch {
      setError('Failed to update order status');
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order #{order.id}</strong> - Status: {order.status}
            <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
