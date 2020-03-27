const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/add', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:              true,
    });

    client.connect();

    //adding lab tuple
    client.query(`insert into lab values 
    ('${req.body.ID}'::char(8), 
    '${req.body.Password}'::char(64))`)

	.then( () => {
        client.end();
        res.json("Add successful");
    })
    .catch( (err) => {
        console.error(err);
        next(err);
        return;
    });

});

module.exports = router;