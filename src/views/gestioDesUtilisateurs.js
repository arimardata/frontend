import React, { Component } from "react";
import Table from "../utils/table";
import PageTitle from "../components/common/PageTitle";
import fetchApi from "../utils/fetchApi";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Container,
  Card,
  CardHeader,
  InputGroup,
  Alert,
  ButtonGroup,
  CardBody
} from "shards-react";
import { Store, Constants } from "../flux";

class gestioDesUtilisateurs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUsers: [],
      data: { authority: "ROLE_USER" },
      info: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.SELECTE_USER, this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      selectedUsers: Store.getSelectedUsers()
    });
  }

  async componentWillMount() {
    Store.addChangeListener(Constants.SELECTE_USER, this.onChange);
    const data = await fetchApi({
      method: "GET",

      url: "/api/user/find",
      token: window.localStorage.getItem("token")
    });
    this.setState({
      users: data
    });
  }

  // handleChange(e) {
  //   const data = this.state.data;
  //   data[e.target.name] = e.target.value;

  //   this.setState({
  //     data
  //   });
  // }

  // async handleClick() {
  //   let EmptyUsername =
  //     this.state.data["username"] == "" || this.state.data["username"] == null
  //       ? true
  //       : false;
  //   let EmptyPassword =
  //     this.state.data["password"] == "" || this.state.data["password"] == null
  //       ? true
  //       : false;
  //   if (EmptyUsername || EmptyPassword) {
  //     this.setState({ info: "veuillez remplir tous les champs" });
  //     return 0;
  //   }
  //   const body = {
  //     username: this.state.data["username"],
  //     password: this.state.data["password"],
  //     authority: this.state.data["authority"]
  //   };
  //   const token = window.localStorage.getItem("token");
  //   const newUser = await fetchApi({
  //     url: `/api/user/create`,
  //     body,
  //     method: "POST",
  //     token
  //   });
  //   this.setState({ info: "Utilisateur Ajoute avec Succes " });
  //   this.setState({ users: [...this.state.users, newUser] });
  // }

  render() {
    // let info;
    // if (this.state.info) {
    //   info = (
    //     <Alert theme="info" className="mb-0">
    //       {this.state.info}
    //     </Alert>
    //   );
    // }
    return (
      <Container fluid className="main-content-container px-4">
        <Card style={{ height: 33 }} small className="  mt-1">
          {this.state.selectedUsers.length > 0 && (
            <ButtonGroup>
              <Button outline theme="primary">
                <i class="material-icons">settings</i>
              </Button>
              <Button outline theme="danger">
                <i class="material-icons">delete</i>
              </Button>
              <Button outline theme="black">
                <i class="material-icons">done</i>
              </Button>
            </ButtonGroup>
          )}
        </Card>
        <Card small className="mt-1">
          <CardBody className="p-0 pb-3">
            <Table
              table={this.state.users}
              selected={this.state.selectedUsers}
              actionOne={Constants.SELECT_USER}
              actionMany={Constants.SELECT_ALL_USERS}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default gestioDesUtilisateurs;
