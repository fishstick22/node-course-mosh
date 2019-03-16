const {Customer, validate} = require('../models/customer'); 
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  try {
    await validate(req.body);
  } catch(error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    const id = req.params.id
    console.log('Put', id)
    await Customer.findOneAndUpdate({ _id: id },
      {$set:{ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }}, { new: true })
      .exec((err, customer) => {
        if(err) {
          console.log(err.message);
          if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(404).json({success: false, msg: 'Customer id not found'});
          }
          return res.json({success: false, msg: 'Cannot update Customer'});
        }
        if (!customer) {
          return res.status(404).json({success: false, msg: 'Customer not updated'});
        }
        console.log('Updated', id);
        res.send(customer);
      });
  } catch (error) {
    res.status(500).send(error);
    //return res.status(404).send('The customer with the given ID was not found.');
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findOneAndDelete({_id: id})
      .exec(function(err, genre) {
        if (err) {
          return res.status(404).json({success: false, msg: 'Customer id not found'});
      }  
      console.log('Deleted', id);
      res.json({success: true, msg: 'Customer deleted.'});
      
    });
    //res.send(genre);
  } catch(error) {
    return res.status(404).send('The customer with the given ID was not found.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    res.send(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(404).send('The customer with the given ID was not found.');

  }
});

module.exports = router; 