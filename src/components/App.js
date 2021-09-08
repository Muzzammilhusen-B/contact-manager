import React from "react";
import "antd/dist/antd.css";
import HeaderBar from "./HeaderBar";
import ContactList from "./ContactList";
// import ContactCard from "./ContactCard";
import AddContact from "./AddContact";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
      <HeaderBar />

      <Router>
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
