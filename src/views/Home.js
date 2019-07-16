import React from "react";
import { Container, Button } from "shards-react";

const Home = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h3>Welcome to the home  place !</h3>
        <Button pill>&larr; Go Back</Button>
      </div>
    </div>
  </Container>
);

export default Home;
