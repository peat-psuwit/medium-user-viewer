import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import './App.css';

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
