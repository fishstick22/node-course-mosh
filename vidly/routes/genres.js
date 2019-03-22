const {Genre, validate} = require('../models/genre');
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// const genres = [
//     { id: 1, name: 'Action' },  
//     { id: 2, name: 'Horror' },  
//     { id: 3, name: 'Romance' },  
//   ];

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name').catch((error) => {
    res.status(500).send(error.details[0].message);
  });
  res.send(genres);
});

router.post('/', async (req, res) => {
  // const { error } = validateGenre(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  try {
    await validate(req.body);
  } catch(error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    console.log('Passed validation');
    const genre = new Genre({ name: req.body.name });

    await genre.save();
    res.send(genre);
  } catch(error) {
    console.log('caught error in save:', error);
    return res.status(500).send(error);
  }  
});

router.put('/:id', async (req, res) => {
  try {
    await validate(req.body);
  } catch(error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    //(node:9352) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    const id = req.params.id
    console.log('Put', id)
    // const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    //   new: true
    // });
    // if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    // res.send(genre);
    await Genre.findOneAndUpdate({ _id: id }, {$set:{ name: req.body.name }}, { new: true })
      .exec((err, genre) => {
        if(err) {
          console.log(err.message);
          if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(404).json({success: false, msg: 'Genere id not found'});
          }
          return res.json({success: false, msg: 'Cannot update Genre'});
        }
        if (!genre) {
          return res.status(404).json({success: false, msg: 'Genere not updated'});
        }
        console.log('Updated', id);
        res.send(genre);
      });
  } catch (error) {
    res.status(500).send(error);
    //return res.status(404).send('The genre with the given ID was not found.');
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Genre.findOneAndDelete({_id: id})
      .exec(function(err, genre) {
        if (err) {
          return res.status(404).json({success: false, msg: 'Genere id not found'});      
      } 
      console.log('Deleted', id);
      res.json({success: true, msg: 'Genere deleted.'});
      
    });
    //res.send(genre);
  } catch(error) {
    return res.status(404).send('The genre with the given ID was not found.');
  }


});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    res.send(genre);
  } catch (error) {
    console.log(error.message);
    return res.status(404).send('The genre with the given ID was not found.');

  }
});

module.exports = router;