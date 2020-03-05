import React, {useState, useEffect} from 'react';
import Login from './login/Login'

import { makeStyles } from '@material-ui/core/styles';
import NurseView from "./views/NurseView";


const styles = makeStyles(theme => ({

  }));



const App = () => {

	const classes = styles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [curUser, setCurUser] = useState({});

	const handleLogin = (user) => {
		setIsLoggedIn(true);
		setCurUser(user);
	}

	const handleLogout = () => {
		setIsLoggedIn(false);
	}
	let name;
	if (curUser && curUser.name) {
		name = curUser.name.substring(0, curUser.name.indexOf(" "));
	}

	let view;
	switch (curUser.userType) {
		case ('Nurse'):
			view = <NurseView handleLogout={handleLogout} name={name}/>;
			break;
		case ('Admin'):
	}



	return (
	<>
		{!isLoggedIn && <Login handleLogin={handleLogin}/>}
		{isLoggedIn && view}
	</>
  );
}

export default App;