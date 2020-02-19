import React, {useState, useEffect} from 'react';
import './App.css';


const App = () => {
	
	const [testData, setTestData] = useState("error");
	
	useEffect(() => {
		fetch('/api/test')
			.then(res => res.json())
			.then(stringData => setTestData(stringData));
	});
	
	
	return (
	<div className="App">
      <header className="App-header">
       <p>test api connection: </p>
	   {testData}
      </header>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
  // // Initialize state
  // state = { passwords: [] }

  // // Fetch passwords after first mount
  // componentDidMount() {
    // this.getPasswords();
  // }

  // getPasswords = () => {
    // // Get the passwords and store them in state
    // fetch('/api/passwords')
      // .then(res => res.json())
      // .then(passwords => this.setState({ passwords }));
  // }

  // render() {
    // const { passwords } = this.state;

    // return (
      // <div className="App">
        // {/* Render the passwords if we have them */}
        // {passwords.length ? (
          // <div>
            // <h1>5 Passwords.</h1>
            // <ul className="passwords">
              // {/*
                // Generally it's bad to use "index" as a key.
                // It's ok for this example because there will always
                // be the same number of passwords, and they never
                // change positions in the array.
              // */}
              // {passwords.map((password, index) =>
                // <li key={index}>
                  // {password}
                // </li>
              // )}
            // </ul>
            // <button
              // className="more"
              // onClick={this.getPasswords}>
              // Get More
            // </button>
          // </div>
        // ) : (
          // // Render a helpful message otherwise
          // <div>
            // <h1>No passwords :(</h1>
            // <button
              // className="more"
              // onClick={this.getPasswords}>
              // Try Again?
            // </button>
          // </div>
        // )}
      // </div>
    // );
  // }
// }

// export default App;
