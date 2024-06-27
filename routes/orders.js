const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Impor model Order
// Endpoint untuk menambahkan order baru
router.post('/', async (req, res, next) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body; 
    const newOrder = await Order.create({ customerID, firstName, employeeID, orderDate, shipperID });
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk menampilkan semua order
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk menampilkan order berdasarkan ID
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    next(err);
  }
});
// Endpoint untuk memperbarui order berdasarkan ID
router.put('/:id', async (req, res, next) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body; // Ganti dengan field yang sesuai untuk Order
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.customerID = customerID;
      order.firstName = firstName;
      order.employeeID = employeeID;
      order.orderDate = orderDate;
      order.shipperID = shipperID;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus order berdasarkan ID
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
