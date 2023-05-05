import logo from './logo.svg';
import {get, clear} from "./storage";
import Home from "./home";
import Dashboard from "./dashboard";
import { useState } from 'react';
import './App.css';

function App() {
  let [session_user, setSessionUser] = useState(get("session_user"));
  return (
    <div className="App">
      {session_user ?
        <Dashboard logout={() => {
          clear();
          setSessionUser(null);
        }} />  
        :
        <Home 
          handleOpenDashboard={user => {
            setSessionUser(user);
          }}
        />
      }
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
