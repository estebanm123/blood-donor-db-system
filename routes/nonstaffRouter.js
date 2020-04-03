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
	.then( (results) => {
        // add healthInfo
        let curDate = new Date();
        let dateAdded = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;
        let birthDate = `${req.body.birthdate.substring(6)}-${req.body.birthdate.substring(3,5)}-${req.body.birthdate.substring(0,2)}`;

        return client.query(`insert into healthinfohasa values 
        ('${dateAdded}'::date, 
        '${req.body.ID}'::char(8), 
        '${birthDate}'::date,
        '${req.body.Height}'::integer,
        '${req.body.Weight}'::integer,
        '${req.body.bloodtype}'::char(64))`)
	})
	.then( (results) => {
        // add patient/ recipient
        if (req.body.category === "Patients") {
            table = 'recipient';
            values = `('${req.body.ID}'::char(8), ${req.body['Amount Required ml']}::integer)`;
        } else {
            table = 'donor';
            values = `('${req.body.ID}'::char(8), ${req.body['canDonate']}::boolean)`;
        }
        return client.query(`insert into ${table} values ${values}`)
    })
    .then( (results) => {
        client.end();
        res.json("Add successful");
    })
	.catch( (err) => {
        console.error(err);
        // TODO delete nonstaff entry
        next(err);
        return;
    });
    

    
  
});


router.post('/search', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
    let cols = "";
    for (let col of req.body.extraFields) {
        switch (col) {
            case("Blood Type"): 
                col = "bloodtype";
                break;
            case("Amount Required"):
                col = "amtrequired";
                break;
            case("Valid"):
                col = "candonate";
                break;
            default:
                col = col.toLowerCase();
        }
        cols += ( ", " + col );
        console.log(cols);
    }


    let target = req.body.field;
    switch(target) {
        case("Blood Type"):
            target = "bloodtype";
            break;
        default:
            target = target.toLowerCase();
    }

    let query;
    if (req.body.catName === "Patients") {
        query = `select n.id${cols} from nonstaff n, healthinfohasa h, recipient r 
        where r.recipientid = n.id and n.id = h.nonstaffid and ${target} like '%${req.body.searchInput}%'`;
    } else {
        query = `select n.id${cols} from nonstaff n, healthinfohasa h, donor d
        where d.donorid = n.id and n.id = h.nonstaffid and ${target} like '%${req.body.searchInput}%'`;
    }
    console.log(query);

	client.query(query)
	.then( (results) => {
          client.end();
          if (results.rows.length !== 0) {
            console.log(results.rows);
            res.json(JSON.stringify(results.rows));

          } else {
              res.json("[]");
          }

	})
	.catch( (err) => {
    console.error(err);
       next(err);
	});
    
  
});



router.post('/edit', function(req, res, next) {    
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl:				true,
	});

	client.connect();
    

    let query = "";
    for (let key of Object.keys(req.body)) {
        switch (key) {
            case ('Name'):
            case ('Email'):
            case ('Phone'):
                query += `update nonstaff set ${key} = '${req.body[key]}' where id = '${req.body.id}';`;
                break;
            case ('amountRequired'):
                query += `update recipient set amtRequired = '${req.body[key]}' where recipientid = '${req.body.id}';`;
                break;
            case ('canDonate'):
                query += `update donor set canDonate =  '${req.body[key]}' where donorid = '${req.body.id}';`;
                break;
            case ('BloodType'):
            case ('Height'):
            case ('Weight'):
                query += `update healthinfohasa set ${key} = '${req.body[key]}' where nonstaffid = '${req.body.id}';`;
                break;
        }
    }
    
	client.query(query)
	.then( (results) => {
        client.end();
        res.json("edit sucessful")

	})
	.catch( (err) => {
        console.error(err);
       next(err);
	});
    

});

module.exports = router;
