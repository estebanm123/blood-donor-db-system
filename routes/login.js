const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
	
    let userType;
    switch (req.body.userType) {
        case ("Admin"): 
            userType = "administrator";
            break;
        case ("Nurse"):
        case ("Lab"):
        default:
            userType = req.body.userType;
    }
	client.query(`select * from ${userType} where id='${req.body.id}'::char(8) and password='${req.body.password}'`)
	.then( (results) => {
          client.end();
          console.log(results.rows);
          if (results.rows.length !== 0) {
            res.json(JSON.stringify(results));
          } else {
              res.json("[]");
          }

	})
	.catch( (err) => {
        console.error(err);
        res.send(new Error("Error with attempted login"));
	});
	
  
});

module.exports = router;
