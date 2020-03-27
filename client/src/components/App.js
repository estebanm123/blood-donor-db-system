import React, {useState, useEffect} from 'react';
import Login from './login/Login'

import { makeStyles } from '@material-ui/core/styles';
import NurseView from "./views/NurseView/NurseView";
import AdminView from "./views/AdminView/AdminView";
import LabView from "./views/LabView/LabView";


const styles = makeStyles(theme => ({

  }));



const App = () => {

	const classes = styles();
	const [isLoggedIn, setIsLoggedIn] = useState(true); // set to FALSE
	const [curUser, setCurUser] = useState({userType: 'Lab'}); // set to empty obj


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
			view = <NurseView handleLogout={handleLogout} name={name} id={curUser.id}/>;
			break;
		case ('Admin'):
			view = <AdminView handleLogout={handleLogout} name={name}/>;
			break;
		case ('Lab'):
			view = <LabView handleLogout={handleLogout} name={name}/>
	}



	return (
	<>
		{!isLoggedIn && <Login handleLogin={handleLogin}/>}
		{isLoggedIn && view}
	</>
  );
}

export default App;