const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail'); // Impor model OrderDetail

// Endpoint untuk menambahkan order detail baru
router.post('/', async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body; // Ganti dengan field yang sesuai untuk OrderDetail
    const newOrderDetail = await OrderDetail.create({ orderId, productId, quantity });
    res.status(201).json(newOrderDetail);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua order details
router.get('/', async (req, res, next) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan order detail berdasarkan ID
router.get('/:id', async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      res.json(orderDetail);
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui order detail berdasarkan ID
router.put('/:id', async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body; // Ganti dengan field yang sesuai untuk OrderDetail
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      orderDetail.orderId = orderId;
      orderDetail.productId = productId;
      orderDetail.quantity = quantity;
      await orderDetail.save();
      res.json(orderDetail);
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus order detail berdasarkan ID
router.delete('/:id', async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      await orderDetail.destroy();
      res.json({ message: 'Order detail deleted' });
    } else {
      res.status(404).json({ message: 'Order detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
