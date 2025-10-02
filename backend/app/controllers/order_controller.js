const Order = require('../models/order');

class OrderController {
  // Create a new order
  static async create(req, res) {
    try {
      const userId = req.user.id;
      const orderData = { ...req.body, user_id: userId };
      const order = await Order.create(orderData);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    }
  }

  // Get all orders for user
  static async getAll(req, res) {
    try {
      const userId = req.user.id;
      const orders = await Order.findByUserId(userId);

      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  }

  // Get order by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error.message
      });
    }
  }

  // Update order status (could be for admin, but here for user to cancel or something)
  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (order.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const updatedOrder = await Order.updateStatus(id, status);

      res.json({
        success: true,
        message: 'Order status updated successfully',
        data: updatedOrder
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
