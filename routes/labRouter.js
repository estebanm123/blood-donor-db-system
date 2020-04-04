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

router.post('/viewDonations', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:              true,
    });
    client.connect();
    //adding lab tuple
        client.query(`select d.donorid, d.donationid, d.date, d.quantity, h.bloodtype 
                        from donationitem d, healthinfohasa h, nurse n, location l
                        where d.donorid = h.nonstaffid and n.id = d.nurseid and n.locationid = l.id 
                                and l."labId" = '${req.body.labid}' and d.istested = 'false'
     `)
	.then( (results) => {
        client.end();
        res.json(results.rows);
    })
    .catch( (err) => {
        console.error(err);
        next(err);
        return;
    });

});

router.post('/report', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:              true,
    });

    // update tested

    client.connect();
    let curDate = new Date();
    let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
    

    let query = `insert into report values (
        '${Math.random().toString(36).substr(2, 8)}'::char(8), 
        '${dateAdded}'::date, 
        '${req.body.reasoncode}'::char(5),
        '${req.body.donationid}'::char(8))
`;
console.log(query);
    //adding lab tuple
    client.query(query
     )
     .then (() => {
         return client.query(`update donationitem set istested = 'true' where donationitem.donationid = '${req.body.donationid}'`);
     })
	.then( () => {
        return client.query(`update donationreserves set quantity = quantity + ${req.body.quantity} where typestored = '${req.body.bloodtype}'
        `)
    })
    .then( () => {
        client.end();
        res.json('report successful');
    })
    .catch( (err) => {
        console.error(err);
        next(err);
        return;
    });

});

module.exports = router;