import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import AreasList from "./screens/AreasList";
import CreateArea from "./screens/CreateArea";
import EditArea from "./screens/EditArea";
import Home from "./screens/Home";

const App = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/editarea/:id">
            <EditArea />
          </Route>
          <Route path="/createarea">
            <CreateArea />
          </Route>
          <Route path="/areas">
            <AreasList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
