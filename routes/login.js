const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/', function(req, res, next) {
    console.log(req.body);
    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
	
    results = [];
	client.query(`select * from ${req.body.userType} where staffid='${req.body.id}'::char(8) and password='${req.body.password}'`)
	.then( (results) => {
		  console.log(results.rows);
		  results = results.rows;
          client.end();
          if (results.rows) {
            res.json(JSON.stringify(results))
          } else {
              res.json("not found");
          }

	})
	.catch( (err) => {
		console.error(err);
	});
	
  
});

module.exports = router;
