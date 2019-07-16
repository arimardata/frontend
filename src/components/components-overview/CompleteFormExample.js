import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormInput,
  Button
} from "shards-react";

const CompleteFormExample = () => (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Col md="6" className="form-group">
            <label htmlFor="feEmailAddress">Email</label>
            <FormInput id="feEmailAddress" type="email" placeholder="Email" />
          </Col>
          <Col md="6">
            <label htmlFor="fePassword">Password</label>
            <FormInput id="fePassword" type="password" placeholder="Password" />
          </Col>
          <Col md="6">
            <br />
            <Button>Se Connecter</Button>
          </Col>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default CompleteFormExample;
