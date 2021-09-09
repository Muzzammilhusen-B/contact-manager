import React from "react";
import "antd/dist/antd.css";
import HeaderBar from "./HeaderBar";
import ContactList from "./ContactList";
// import ContactCard from "./ContactCard";
import AddContact from "./AddContact";
import {Switch, Route, Router} from "react-router-dom";
import history from "./history";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "801px",

        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Router history={history}>
        <HeaderBar />

        <Switch>
          <Route path="/" exact component={ContactList} />

          <Route path="/add" exact component={AddContact} />

          {/* <ContactCard /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
