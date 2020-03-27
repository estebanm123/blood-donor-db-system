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
            '${transactionnum}'::integer, 
            '${req.body['Blood Type']}'::char(64), 
            '${req.body['Quantity']}'::integer,
            '${req.body['Patient ID']}'::char(8))`)
        .then( (results) => {   
            let curDate = new Date();
            let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
            return client.query(`insert into requests values (
                '${req.body['Admin ID']}'::char(8),
                '${req.body['nurseID']}'::char(8), 
                '${transactionnum}'::integer, 
                '${dateAdded}'::date)`);
        }).then( (results) => {
            res.json("Add successful");
        })
        .catch( (err) => {
            console.error(err);
            next(err);
            return;
        });
    })
    .catch( (err) => {
        console.error(err);
        res.json(new Error("Failed to add request to requests table."));
        next(err);
        return;
    });
  
});

module.exports = router;
