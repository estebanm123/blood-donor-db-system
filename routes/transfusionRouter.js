const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/view', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
    });
    client.connect();

    let nurseid = req.body.nurseid;
    client.query(`select r.transactionnum, r.quantity, r.type, r.patientid, n.name, r.isvalid, rt.dateandtime 
                    from response r, respondsto rt, nonstaff n 
                    where r.transactionnum = rt.transactionnumber and rt.nurseid = '${nurseid}'
                            and n.id = r.patientid`)
	.then( (results) => {   
        client.end();
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
    client.query(`delete from respondsto where transactionnumber = '${tnum}';`)
    .then (() => {
        let curDate = new Date();
        let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
          return client.query(`insert into transfusion values ('${Math.random().toString(36).substr(2, 8)}',
           '${req.body.patientid}', 
           '${req.body.nurseid}', 
           null, 
           '${dateAdded}')`);
    })
    .then( (results) => {   
       return client.query(`delete from response where transactionnum = '${tnum}' `);
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
