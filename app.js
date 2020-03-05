const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');
const nonstaffRouter = require('./routes/nonstaffRouter');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'client/build')));


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routes
app.use("/api/login", loginRouter);
app.use("/api/nonstaff", nonstaffRouter);



app.get('*', (req, res) => {
res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

module.exports = app;	

