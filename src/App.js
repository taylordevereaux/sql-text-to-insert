import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// React Strap Components
import {Container,
  Row,
  Col}
  from 'reactstrap';
// Components
import SqlInsertIntoView from "./components/SqlInsertIntoView/SqlInsertIntoView";
import FooterView from "./components/FooterView/FooterView";

class App extends Component {
  render() {
    return (
    <Container id="app" fluid={true} className="h-100 d-flex flex-column">
      <Row className="d-flex flex-fill no-gutters">
        <Col className="d-flex flex-column">
          <SqlInsertIntoView />
        </Col>
      </Row>
      <Row className="align-items-end">
        <FooterView />
      </Row>
    </Container>
    );
  }
}

export default App;
