const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/add', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
    });
    client.connect();

    let transactionnum;
    client.query(`select transactionnum from request order by transactionnum desc`)
	.then( (results) => {   
        if (results.rows.length === 0) {
            transactionnum = 0;
        } else {
            transactionnum = results.rows[0]['transactionnum'];
            transactionnum++;
        }

        client.query(`insert into request values (
            ${transactionnum}::integer, 
            '${req.body['Blood Type']}'::char(64), 
            ${req.body['Quantity']}::integer,
            '${req.body['Patient ID']}'::char(8))`)
        .then( (results) => {   
            console.log(results.rows);
        })
        .catch( (err) => {
            console.error(err);
            res.json(new Error("Failed to add request."));
            return;
        });


        // add requests
        let date = `${req.body.date.substring(6)}-${req.body.date.substring(3,5)}-${req.body.date.substring(0,2)}`;

        client.query(`insert into requests values (
            '${req.body['Admin ID']}'::char(8), 
            '${req.body['nurse id']}'::char(8), 
            ${transactionnum}::integer,
            '${date}'::date`)

            .then( (results) => {
                console.log(results.rows);
            })
            .catch( (err) => {
                console.error(err);
                res.json(new Error("Failed to add request."));
                return;
            });
    })
    .catch( (err) => {
        console.error(err);
        res.json(new Error("Failed to add request."));
        return;
    });



    
   




    res.json("Add successful");
  
});

module.exports = router;
