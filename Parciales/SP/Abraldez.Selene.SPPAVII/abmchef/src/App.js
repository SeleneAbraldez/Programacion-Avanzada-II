import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Error404 from './pages/Error404.js';
import TokenProvider from './context/TokenContext';

function App() {

  // const [token, setToken] = useState(null);

  // const flagToken = async () => {
  //   await setToken(localStorage.getItem("tokenLogin"));
  //   console.log(token);
  // }

  // useEffect(() => {
  //   flagToken();
  //   console.log(token);
  // }, []);

  return (
    <div>
      <TokenProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/tabla" component={HomePage}></Route>
          <Route path="*" component={Error404} />
          {/* {token ?
            <Route exact path="/tabla" component={HomePage}></Route>

            :
            <Route exact path="/login" component={LoginPage}></Route>
          } */}
          {/* <Route exact path="*" component={Home}></Route> */}
        </Switch>
      </Router>
      </TokenProvider>
    </div>
  );
}

export default App;
