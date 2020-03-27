const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/add', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
	   
    // add nonstaff tuple
    client.query(`insert into nonstaff values 
    ('${req.body.ID}'::char(8), 
    '${req.body.Address}'::char(255), 
    '${req.body.Email}'::char(64), 
    '${req.body.Phone}'::char(10),
    '${req.body.Name}'::char(64))`)
	.then( () => {

	})
	.catch( (err) => {
        console.error(err);
        res.json(new Error("Failed to add nonstaff."));
        return;
	});
    

    // add healthInfo
    let curDate = new Date();
    let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
    let birthDate = `${req.body.birthdate.substring(6)}-${req.body.birthdate.substring(3,5)}-${req.body.birthdate.substring(0,2)}`;

    client.query(`insert into healthinfohasa values 
    ('${dateAdded}'::date, 
    '${req.body.ID}'::char(8), 
    '${birthDate}'::date,
    '${req.body.Height}'::integer,
    '${req.body.Weight}'::integer,
    '${req.body.BloodType}'::char(6))`)
	.then( () => {
	})
	.catch( (err) => {
        console.error(err);
        // TODO delete nonstaff entry
        res.json(new Error("Failed to add nonstaff."));
        return;
    });
    

    // add patient/ recipient
    if (req.body.category === "Patients") {
        table = 'recipient';
        values = `('${req.body.ID}'::char(8), ${req.body['Amount Required ml']}::integer)`;
    } else {
        table = 'donor';
        values = `('${req.body.ID}'::char(8), ${req.body['canDonate'].toLowerCase()}::boolean)`;
    }

    client.query(`insert into ${table} values ${values}`)
	.then( () => {
          client.end();    
          res.json("Add successful");

	})
	.catch( (err) => {
        console.error(err);
        // TODO delete nonstaff entry [which should delete healthinfohasa]
        next(err);
        return;
    });
    
  
});

module.exports = router;
