const express = require('express');
var bodyParser = require('body-parser');
var loginRouter = require('./routes/login');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === "dev") {
	app.use(express.static(path.join(__dirname, 'public')));
} else {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/api/login", loginRouter);


if (process.env.NODE_ENV === "dev") {
	app.get('*', (req, res) => {
	res.send("dev mode: use api endpoint");
});
} else {
	app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

module.exports = app;	

