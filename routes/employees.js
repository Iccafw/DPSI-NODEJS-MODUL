const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Impor model Employee

// Endpoint untuk menambahkan employee baru
router.post('/', async (req, res, next) => {
  try {
    const { lastName, firstName, birthDate } = req.body; // Ganti dengan field yang sesuai untuk Employee
    const newEmployee = await Employee.create({ lastName, firstName, birthDate });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua employee
router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan employee berdasarkan ID
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui employee berdasarkan ID
router.put('/:id', async (req, res, next) => {
  try {
    const { lastName, firstName, birthDate } = req.body; // Ganti dengan field yang sesuai untuk Employee
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      employee.lastName = lastName;
      employee.firstName = firstName;
      employee.birthDate = birthDate;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus employee berdasarkan ID
router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
