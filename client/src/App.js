import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login'

import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles(theme => ({

  }));



const App = () => {

	const classes = styles();
	const [testData, setTestData] = useState("could not connect to api");

	useEffect(() => {
		fetch('/api/test')
			.then(res => res.json())
			.then(stringData => setTestData(stringData));
	});


	return (
	<>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
		{/*<div className="App">*/}
		{/*  <header className="App-header">*/}
		{/*   <p>test api connection: </p>*/}
		{/*   {testData}*/}
		{/*  </header>*/}
		{/*</div>*/}
	<Login />
	</>
  );
}

export default App;