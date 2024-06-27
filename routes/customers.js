const express = require('express');
const router = express.Router();
const Customer = require('../models/customer'); // Impor model customer

// Endpoint untuk menambahkan customer baru
router.post('/', async (req, res, next) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body; // Ganti dengan field yang sesuai untuk Customer
    const newCustomer = await Customer.create({ customerName, contactName, address, city, postalCode, country });
    res.status(201).json(newCustomer);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua customer
router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan customer berdasarkan ID
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui customer berdasarkan ID
router.put('/:id', async (req, res, next) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body; // Ganti dengan field yang sesuai untuk Customer
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      customer.customerName = customerName;
      customer.contactName = contactName;
      customer.address = address;
      customer.city = city;
      customer.postalCode = postalCode;
      customer.country = country;
      await customer.save();
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus customer berdasarkan ID
router.delete('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.json({ message: 'Customer deleted' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
