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
<<<<<<< HEAD

	})
	.catch( (err) => {
        console.log('error in insert into query');
        next(err);
        return;
    });
=======
	})
	.catch( (err) => {
        console.error(err);
        // TODO delete nonstaff entry [which should delete healthinfohasa]
       // res.json(new Error("Failed to add staff."));
        next(err);
        return;
    });
    
>>>>>>> a28420a39db79ed561fc19eb5de0e4183dd314f7
  
});

module.exports = router;
