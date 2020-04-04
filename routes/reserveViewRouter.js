const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/view', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
    });
    client.connect();

    client.query(`select *
                    from donationreserves
                    order by typestored asc`)
	.then( (results) => {   
        client.end();
       console.log(results.rows);
       res.json(results.rows);
    })
    .catch( (err) => {
        client.end();
        console.error(err); 
        next(err);
        return;
    });

});

module.exports = router;
