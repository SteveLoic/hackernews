import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import firebase, { AuthContext } from "../firebase/index";
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import useAuth from "./Auth/useAuth";
import Header from "./Header";
import CreateLink from "./Link/CreateLink";
import LinkDetail from "./Link/LinkDetail";
import LinkList from "./Link/LinkList";
import SearchLink from "./Link/SearchLinks";

function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLink} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>
          </div>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
