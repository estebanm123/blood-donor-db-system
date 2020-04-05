import React, {useState, useEffect} from 'react';
import Login from './login/Login'

import { makeStyles } from '@material-ui/core/styles';
import NurseView from "./views/NurseView/NurseView";
import AdminView from "./views/AdminView/AdminView";
import LabView from "./views/LabView/LabView";
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';


const styles = makeStyles(theme => ({

  }));



const App = () => {

	const classes = styles();

	const [isLoggedIn, setIsLoggedIn] = useState(false); // set to FALSE
	const [curUser, setCurUser] = useState({}); // set to empty obj //userType: 'Nurse'

	useEffect(() => {
		document.title = "Blood Donation Management System"
	}, []);

	const handleLogin = (user) => {
		setIsLoggedIn(true);
		setCurUser(user);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setCurUser({});
	};

	let name;
	if (curUser && curUser.name) {
		name = curUser.name.substring(0, curUser.name.indexOf(" "));
	}

	let view;
	switch (curUser.userType) {
		case ('Nurse'):
			view = <NurseView handleLogout={handleLogout} name={curUser.name} id={curUser.id}/>; //set to curUser.id
			break;
		case ('Admin'):
			view = <AdminView handleLogout={handleLogout} name={curUser.name} id={curUser.id}/>;
			break;
		case ('Lab'):
			view = <LabView handleLogout={handleLogout} id={curUser.id}/> // set to curUser.id
	}



	return (

	<>
		{!isLoggedIn && <Login handleLogin={handleLogin}/>}
		{isLoggedIn && view}
	</>
  );
}

export default App;