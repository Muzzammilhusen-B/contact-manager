import React from "react";
import api from "./apis/contacts";
import {Table, Button, Space, Tooltip, Modal, Form, Input} from "antd";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditTwoTone} from "@ant-design/icons";

class ContactList extends React.Component {
  state = {data: [], isModalVisible: false, selectedUser: []};
  async componentDidMount() {
    await this.renderContactList()
      .then((response) => this.setState({data: response}))
      .catch((err) => console.log("error message", err));
  }
  //fetch contacts
  renderContactList = async () => {
    const response = await api.get("/contacts");
    console.log("contacts", response);
    return response.data;
  };
  //handle delete contact
  handleDelete = async (id) => {
    await api.delete(`/contacts/${id}`);
    const result = await this.renderContactList();
    console.log("data", result);

    this.setState({data: result});
  };
  //handle edit contact
  handleEdit = (id) => {
    this.setState({isModalVisible: true});
    const {data} = this.state;
    const selectedUser = data.find((item) => item.id === id);
    console.log("selected user", selectedUser);
    this.setState({selectedUser: selectedUser});
  };
  //handle on change
  handleOnchange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }; //
  //handle ok with patch request
  handleOk = async () => {
    // console.log("edited contact", this.state);

    const {id} = this.state.selectedUser;
    const {name, email} = this.state;
    const newName =
      name !== this.state.selectedUser.name
        ? name
        : this.state.selectedUser.name;
    const newEmail =
      email !== this.state.selectedUser.email
        ? email
        : this.state.selectedUser.email;
    const response = {
      id,
      name: newName,
      email: newEmail,
    };
    await api.patch(`/contacts/${id}`, response);
    this.setState({isModalVisible: false});
    // console.log("edited contact", this.state);
    const result = await this.renderContactList();
    console.log("data", result);

    this.setState({data: result});
  };
  handleCancel = () => {
    this.setState({isModalVisible: false});
  };
  render() {
    const {data, isModalVisible, selectedUser} = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        dataIndex: "",
        key: data.id,
        render: (data) => (
          <Space>
            <Tooltip title="Edit Contact">
              <EditTwoTone
                style={{fontSize: "20px"}}
                onClick={() => this.handleEdit(data.id)}
              />
            </Tooltip>
            <Tooltip title="Delete Contact">
              <DeleteOutlined
                style={{fontSize: "20px", color: "red"}}
                onClick={() => this.handleDelete(data.id)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <div style={{width: "50%"}}>
        <div style={{float: "right", marginBottom: "10px"}}>
          <Link to="/add">
            {" "}
            <Button type="primary">Add Contact</Button>
          </Link>
        </div>
        <Table columns={columns} rowKey={data.id} dataSource={data} bordered />
        <Modal
          title="Edit Contact"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical" key={selectedUser.id}>
            <Form.Item
              initialValue={selectedUser.name}
              label="Name"
              name="name"
              rules={[{required: true, message: "Please Enter Name!"}]}
            >
              <Input
                value={selectedUser.name}
                name="name"
                onChange={this.handleOnchange}
              />
            </Form.Item>
            <Form.Item
              initialValue={selectedUser.email}
              label="Email"
              name="email"
              rules={[{required: true, message: "Please Enter Email!"}]}
            >
              <Input
                value={selectedUser.email}
                name="email"
                onChange={this.handleOnchange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default ContactList;
