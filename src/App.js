import React, { Component } from 'react';
import logo from './logo.svg';
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
    <Container id="app" fluid={true}>
      <Row className="mt-3">
        <Col>
          <SqlInsertIntoView className="col-12" />
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
