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
  Alert,
  DropdownItem,
  FormSelect,
  InputGroup
} from "shards-react";
import { Store, Constants, Dispatcher } from "../flux";

class gestioDesUtilisateurs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      info: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.passwordUpdate = this.passwordUpdate.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  handleChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
  }
  changeStatus() {
    const token = window.localStorage.getItem("token");
    fetchApi({
      url: `/api/user/disable/` + this.props.id,
      method: "DELETE",
      token
    })
      .then(res => {
        this.setState({
          info: res.message,
          error: ""
        });
        Dispatcher.dispatch({
          actionType: Constants.UPDATE_USER,
          payload: this.props.id
        });
        let buttomValue =
          document.getElementById("changeStatus").textContent == "Debloque"
            ? "Bloquer"
            : "Debloque";
        document.getElementById("changeStatus").innerHTML = buttomValue;
      })
      .catch(Error => {
        this.setState({
          error: "Erreur de Connection !!",
          info: ""
        });
      });
  }

  passwordUpdate() {
    let EmptyPassword =
      this.state.data["password"] == "" || this.state.data["password"] == null
        ? true
        : false;
    if (EmptyPassword) {
      this.setState({ error: "veuillez remplir tous les champs", info: "" });
      return 0;
    }
    const body = {
      password: this.state.data["password"]
    };
    const token = window.localStorage.getItem("token");
    fetchApi({
      url: `/api/user/passwordReset/` + this.props.id,
      body,
      method: "POST",
      token
    })
      .then(res => {
        this.setState({
          info: res.message,
          error: ""
        });
      })
      .catch(Error => {
        this.setState({
          error: "Erreur de Connection !!",
          info: ""
        });
      });
  }

  render() {
    let info, error;
    let buttonValue;
    if (this.state.info) {
      info = (
        <Alert theme="info" className="mb-0">
          <i class="fas fa-exclamation-circle" /> {this.state.info}
        </Alert>
      );
    }
    if (this.state.error)
      error = (
        <Alert theme="danger" className="mb-0">
          <i class="fas fa-exclamation-circle" /> {this.state.error}
        </Alert>
      );
    if (!this.props.enabled) {
      buttonValue = "Debloquer";
    } else buttonValue = "Bloquer ";
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        {info}
        {error}
        <Row noGutters className="page-header py-4">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col className="form-group">
                  <FormInput
                    value={this.props.username}
                    disabled="true"
                    onChange={this.handleChange}
                    autoComplete="off"
                    id="feEmailAddress"
                    name="username"
                    placeholder="Username"
                    required
                  />
                </Col>

                <Col className="form-group">
                  <FormInput
                    onChange={this.handleChange}
                    id="feEmailAddress"
                    name="password"
                    placeholder="Mot de passe ..."
                    type="password"
                    required
                  />
                </Col>
                <Col>
                  <Button
                    outline
                    size="sm"
                    theme="info"
                    onClick={this.passwordUpdate}
                  >
                    <i class="material-icons">update</i> {"  Modifier"}
                  </Button>
                </Col>
              </Row>
              <DropdownItem divider />
              <Row>
                <Col>
                  <Button
                    id="changeStatus"
                    outline
                    size="sm"
                    theme="danger"
                    onClick={this.changeStatus}
                  >
                    {buttonValue}
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Container>
    );
  }
}

export default gestioDesUtilisateurs;
