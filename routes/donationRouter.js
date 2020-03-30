const express = require('express');
const router = express.Router();
const { Client } = require('pg');

router.post('/add', function(req, res, next) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl:				true,
    });
    client.connect();
    /**
     * @return {string}
     */
    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 8 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 8);
    };
    let donationID = ID();
    let curDate = new Date();
    let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
    client.query(`insert into donationitem values (
            '${req.body['Donor ID']}'::char(8), 
            '${donationID}'::char(8), 
            '${dateAdded}'::date,
            '${req.body['Quantity']}'::integer,
            '${req.body['nurseID']}'::char(8),
            '${false}'::boolean)`)
        .then( (results) => {
            client.end();
            res.json("Add successful");
            return;
        })
        .catch( (err) => {
            console.error(err);
            next(err);
            return;
        });

});

module.exports = router;
