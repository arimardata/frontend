import React from "react";
import PasswordResetForm from "./PasswordResetForm";
import { Container, Col, Card, CardHeader, Alert } from "shards-react";

export default LoginPage => (
  <div>
    <Container fluid className="px-0">
      <center>
        <Alert className="mb-0">
          <i className="fa fa-info mx-2" />
          Un mot de pass vous est associé par l'Admin , Veuillez le modifier
          avant de se connecter :
        </Alert>
      </center>
    </Container>
    <Container>
      <center>
        <Col>
          <Card lg="8" className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">
                Changement de mot de pass lors de la premiere connection{" "}
              </h6>
            </CardHeader>
            <PasswordResetForm />
          </Card>
        </Col>
      </center>
    </Container>
  </div>
);
