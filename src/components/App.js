import React from "react";
import "antd/dist/antd.css";
import HeaderBar from "./HeaderBar";
import ContactList from "./ContactList";
// import ContactCard from "./ContactCard";
import AddContact from "./AddContact";
import {Switch, Route, Router} from "react-router-dom";
import history from "./history";
import contact from "./contact.jpg";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "801px",
        backgroundImage: `url(${contact})`,
        // justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
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
