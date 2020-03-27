const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/add', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

    client.connect();

    // add staff (admin / nurse)
    if (req.body.category === "Nurse") {
        table = 'Nurse';
        values = `('${req.body.ID}'::char(8), '${req.body.Password}'::char(32), 
        '${req.body.LocationID}'::char(8),
        '${req.body.Email}'::char(64), '${req.body.Phone}'::char(16), 
        '${req.body.Name}'::char(64))`;
    } else if (req.body.category === "Administrator") {
        table = 'Administrator';   
        values = `('${req.body.ID}'::char(8), '${req.body.Password}'::char(32), 
        '${req.body.Email}'::char(64), '${req.body.Phone}'::char(16), 
        '${req.body.Name}'::char(64))`;
    }

    console.log(values);
    client.query(`insert into ${table} values ${values}`)
	.then( () => {
          client.end();
          res.json("Add successful");

	})
	.catch( (err) => {
        console.error(err);
       // res.json(new Error("Failed to add staff."));
        next(err);
        return;
    });
  
});

module.exports = router;
