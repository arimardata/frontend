import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button,
  Alert
} from "shards-react";

import { Dispatcher, Constants } from "../../flux";
import fetchApi from "../../utils/fetchApi";

export default class PasswordResetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      error: "",
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({
      data,
      error: ""
    });
  }

  handleClick() {
    let data = this.state.data;
    let EmptyPassword =
      this.state.data["nouveau"] == "" || this.state.data["nouveau"] == null
        ? true
        : false;
    if (EmptyPassword) {
      this.setState({ error: "veuillez Entrer un mot de pass valide" });
      return 0;
    }
    if (data["nouveau"] === data["confirmer"]) {
      const body = {
        password: data["nouveau"]
      };
      let id = window.localStorage.getItem("id");
      let token = window.localStorage.getItem("token");
      fetchApi({
        url: `/api/user/passwordReset/` + id,
        body,
        method: "POST",
        token
      })
        .then(data => {
          this.setState({ success: data.message });
          window.localStorage.clear();
          let payload = {};
          Dispatcher.dispatch({
            actionType: Constants.CLEARUSERDATA,
            payload
          });
        })
        .catch(err => this.setState({ error: "Erreur de connexion" }));
    } else {
      this.setState({ error: "les mots de passes doivent étre identique" });
    }
  }

  render() {
    let error, success;
    if (this.state.error) {
      error = (
        <Alert theme="danger" className="mb-0">
          <i class="fas fa-exclamation-circle" /> {this.state.error}
        </Alert>
      );
    }
    return (
      <ListGroup flush>
        {error}
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Col md="6" className="form-group">
                <label htmlFor="feEmailAddress">Nouveau mot de passe :</label>
                <FormInput
                  autoComplete="off"
                  onChange={this.handleChange}
                  id="fePassword1"
                  type="password"
                  name="nouveau"
                  placeholder="nouveau mot de passe ..."
                  required
                />
              </Col>
              <Col md="6">
                <label htmlFor="fePassword">Confirmer le mot de passe :</label>
                <FormInput
                  autoComplete="off"
                  onChange={this.handleChange}
                  id="fePassword2"
                  type="password"
                  name="confirmer"
                  placeholder="confirmer le mot de passe ..."
                  required
                />
              </Col>
              <Col md="6">
                <br />
                <Button onClick={this.handleClick}>Modifier </Button>
              </Col>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
