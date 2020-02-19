const express = require('express');
const router = express.Router();
const { Client } = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {


	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
	
	results = [];
	client.query('select  * from ok')
	.then( (results) => {
		  console.log(results.rows);
		  results = results.rows;
		  client.end();
		  
		  		  res.json(JSON.stringify(results));

	})
	.catch( (err) => {
		console.error(err);
	});
	
  
});

module.exports = router;
