import React, { Component } from 'react';
import Button from './Button'
import AnimalList from './AnimalList';
import './App.css';

class App extends Component {
  state = {
    animals: []
  }

  handleClickGetAnimals = () => {
    // no need to fetch if animals are already set
    // TODO: be smarter about caching; e.g. fetch if older than a minute
    if (!this.state.animals.length) {
      this.fetchAnimals()
        .then(animals => this.setState({ animals }));
    }
  }
  
  fetchAnimals = async () => {
    return await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '/.netlify/functions'}/serverless-http`)
      .then(response => response.json());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ghost Animals</h1>
        </header>
        <div>
          <p><Button onClick={this.handleClickGetAnimals}>Get spooky animals!</Button></p>
          <AnimalList animals={this.state.animals} />
        </div>
      </div>
    );
  }
}

export default App;
