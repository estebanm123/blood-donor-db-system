const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/view', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:				true,
    });
    client.connect();
    client.query(`select r.reportid, r.date, rc.iscompatible, l."labId" as labid, h.bloodtype
                    from report r, "reportReasonCode" rc, donationitem d, healthinfohasa h, nurse n, location l
                    where r.reasoncode = rc.reasoncode and r.donationid = d.donationid and d.nurseid = n.id and
                    d.donorid = h.nonstaffid and n.locationid = l.id`)
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

router.post('/stat', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:				true,
    });
    client.connect();
    client.query(`select distinct l."labId" as labid, count(*) as numFail
                    from report r, "reportReasonCode" rc, donationitem d, nurse n, location l
                    where r.reasoncode = rc.reasoncode and r.donationid = d.donationid and d.nurseid = n.id and
                    n.locationid = l.id and rc.iscompatible = false
                    group by l."labId"
                    order by l."labId" desc`)
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

router.post('/total', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:				true,
    });
    client.connect();
    client.query(`select count(*) as totalnum
                    from report r, "reportReasonCode" rc, donationitem d, nurse n, location l
                    where r.reasoncode = rc.reasoncode and r.donationid = d.donationid and d.nurseid = n.id and
                    n.locationid = l.id
                    group by l."labId"
                    order by l."labId" desc`)
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
module.exports = router;
