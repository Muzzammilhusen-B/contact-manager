import React from "react";
import {Form, Input, Button, message} from "antd";
import api from "./apis/contacts";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";
import history from "./history";

class AddContact extends React.Component {
  state = {name: "", email: "", id: ""};
  //handle on change
  handleOnchange = (event) => {
    const {name, value} = event.target;

    this.setState({[name]: value});
    // console.log("state", this.state);
  };
  //add contact
  handleAdd = async (e) => {
    e.preventDefault();
    // console.log("add data", this.state);
    const {name, email} = this.state;
    const response = {
      id: uuidv4(),
      name: name,
      email: email,
    };
    console.log("response", response);
    const result = await api.post("/contacts", response);
    if (result.status === 201) {
      const success = () => {
        message.success("Contact added successfully.");
      };
      success();
      history.push("/"); //using creatBrowserHistory from history, in app component import Router from react-router-dom
      // const {history} = this.props;
      // if (history) history.push("/");
    } else {
      const error = () => {
        message.error(`${result.message}`);
      };
      error();
    }
  };
  render() {
    const {name, email} = this.state;
    return (
      <div style={{padding: "20px", width: "50%"}}>
        <h2> Add Contact</h2>
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please Enter Name!",
              },
            ]}
          >
            <Input
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleOnchange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter Email!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              value={email}
              name="email"
              onChange={this.handleOnchange}
            />
          </Form.Item>
          {/* <Form.Item> */}
          <Button
            disabled={name === "" || email === "" ? true : false}
            type="primary"
            onClick={this.handleAdd}
          >
            Add
          </Button>

          {/* </Form.Item> */}
        </Form>
        <Link to="/" style={{float: "left", marginTop: "10px"}}>
          Contact list
        </Link>
      </div>
    );
  }
}

export default AddContact;
