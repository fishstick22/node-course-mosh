const express = require('express');
const router = express.Router();
const config = require('config');

router.get('/', (req, res) => {
    //    res.send('Hello loser...');
        res.render('index', 
            { title: `${config.get('name')}`, 
              message: 'Hello loser...' 
            }
        );
    }); 

module.exports = router;
