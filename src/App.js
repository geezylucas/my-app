import React from "react";
import { CookiesProvider } from "react-cookie";
import { Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import AreasList from "./screens/AreasList";
import CreateArea from "./screens/CreateArea";
import EditArea from "./screens/EditArea";
import SubAreasList from "./screens/SubAreasList";
import CreateSubArea from "./screens/CreateSubArea";
import EditSubArea from "./screens/EditSubArea";
import UsersList from "./screens/UsersList";
import CreateUser from "./screens/CreateUser";
import EditUser from "./screens/EditUser";
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <CookiesProvider>
      <NavBar />
      <Container>
        <Switch>
          <PublicRoute
            restricted
            component={SignIn}
            path="/signin"
            exact
          />
          <PrivateRoute component={Home} path="/" exact />
          <PrivateRoute component={AreasList} path="/areas" exact />
          <PrivateRoute component={CreateArea} path="/createarea" exact />
          <PrivateRoute component={EditArea} path="/editarea/:id" exact />
          <PrivateRoute component={SubAreasList} path="/subareas" exact />
          <PrivateRoute component={CreateSubArea} path="/createsubarea" exact />
          <PrivateRoute component={EditSubArea} path="/editsubarea/:id" exact />
          <PrivateRoute component={UsersList} path="/users" exact />
          <PrivateRoute component={CreateUser} path="/createuser" exact />
          <PrivateRoute component={EditUser} path="/edituser/:id" exact />
        </Switch>
      </Container>
    </CookiesProvider>
  );
};

export default App;
