const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login');
const nonstaffRouter = require('./routes/nonstaffRouter');
const staffRouter = require('./routes/staffRouter');
const requestRouter = require('./routes/requestRouter');
const transfusionRouter = require('./routes/transfusionRouter');
const labRouter = require('./routes/labRouter');
const donationRouter = require('./routes/donationRouter');
const reportRouter = require('./routes/reportRouter');

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
app.use("/api/staff", staffRouter);
app.use("/api/request-blood", requestRouter);
app.use("/api/transfusion", transfusionRouter);
app.use("/api/lab", labRouter);
app.use("/api/donation", donationRouter);
app.use("/api/report", reportRouter);



app.get('*', (req, res) => {
res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
module.exports = app;	