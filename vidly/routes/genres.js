const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// const genres = [
//     { id: 1, name: 'Action' },  
//     { id: 2, name: 'Horror' },  
//     { id: 3, name: 'Romance' },  
//   ];

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

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
    await validateGenre(req.body);
  } catch(error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    console.log('Passed validation');
    let genre = new Genre({ name: req.body.name });

    genre = await genre.save();
    res.send(genre);
  } catch(error) {
    console.log('caught error in save:', error);
    return res.status(500).send(error);
  }  
});

router.put('/:id', async (req, res) => {
  try {
    await validateGenre(req.body);
  } catch(error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
    // if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Genre.findOneAndDelete({_id: id})
      .exec(function(err, item) {
        if (err) {
          return res.json({success: false, msg: 'Cannot remove Genre'});
      }       
      if (!item) {
          return res.status(404).json({success: false, msg: 'Genere id not found'});
      }  
      console.log('Deleted', id)
      res.json({success: true, msg: 'Genere deleted.'});
      
    });
    //res.send(genre);
  } catch(error) {
    return res.status(404).send('The genre with the given ID was not found.');
  }


});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id).catch((error) => {
    res.status(500).send(error);
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;