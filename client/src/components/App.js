import React, {useState, useEffect} from 'react';
import Login from './login/Login'

import { makeStyles } from '@material-ui/core/styles';
import NurseView from "./views/NurseView";
import AdminView from "./views/AdminView";


const styles = makeStyles(theme => ({

  }));



const App = () => {

	const classes = styles();
<<<<<<< HEAD
	const [isLoggedIn, setIsLoggedIn] = useState(true); // set to FALSE
	const [curUser, setCurUser] = useState({userType: 'Admin'}); // set to empty obj

=======
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [curUser, setCurUser] = useState({userType: 'Nurse'});
>>>>>>> 62256ac9c67e8a51ba516393378eb38794073f74

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
			view = <AdminView handleLogout={handleLogout} name={name}/>;
			break;
	}



	return (
	<>
		{!isLoggedIn && <Login handleLogin={handleLogin}/>}
		{isLoggedIn && view}
	</>
  );
}

export default App;