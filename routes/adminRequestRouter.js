const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/view', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
    });
    client.connect();

    let adminID =  req.body.adminID;

    console.log(req.body.adminID);

    client.query(`select r.transactionnum, r.type, r.quantity, r.patient, rs.adminid
                    from request r, requests rs
                    where rs.adminid = '${adminID}' and r.transactionnum = rs.transactionnumber`)
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

router.post('/delete', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
    });
    client.connect();
    
    let tnum = req.body.tnum;
    let curReq; // holds info about current transaction
    client.query(`select r.type, r.quantity, rq.nurseid, r.patient 
                    from request r, requests rq 
                    where r.transactionnum = rq.transactionnumber and transactionnum = ${tnum}`)
    .then( (results) => {
        curReq = results.rows[0];
        return client.query(`select quantity from donationreserves where typestored = '${curReq.type}'`);
    })
    .then( (results) => {
        let quantityAvailable = results.rows[0].quantity;
        let isValid = (quantityAvailable >= curReq.quantity);
        curReq.isValid = isValid;
        if (isValid) return client.query(`update donationreserves
                    set quantity = quantity - '${curReq.quantity}'
                    where typestored = '${curReq.type}' `);
        else return Promise.resolve();
    })
    .then((results) => {
        return client.query(`select transactionnum from response order by transactionnum desc`);
    })
    .then((results) => {
        let newTNum;
        if (results.rows.length === 0) {
            newTNum = 0;
        } else {
            newTNum = results.rows[0]['transactionnum'];
            newTNum++;
        }
        curReq.newTNum = newTNum;
        return client.query(`insert into response values (
                ${newTNum}, 
                ${curReq.isValid? curReq.quantity : 0}, '${curReq.type}', ${curReq.isValid}, '${curReq.patient}')        `);
    })
    .then((results) => {
        let curDate = new Date();
        console.log('h');
        console.log(`insert into respondsto values ('${req.body.adminID}', '${curReq.nurseid}', ${curReq.newTNum},'${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}')`);
        return client.query(`insert into respondsto values ('${req.body.adminID}', '${curReq.nurseid}', ${curReq.newTNum},'${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}')`);
    })
    .then( (results) => { 
          
        return client.query(`delete from requests where transactionnumber = '${tnum}' `);
    })
    .then( (results) => {   
       return client.query(`delete from request where transactionnum = '${tnum}' `);
    })
	.then( (results) => {   
        client.end();
       res.json("Log successful");
    })
    .catch( (err) => {
        client.end();
        console.error(err); 
        next(err);
        return;
    });

});

module.exports = router;
