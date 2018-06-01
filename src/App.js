import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import './App.css';

export const LOGIN_PATH = '/login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          TODO
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
