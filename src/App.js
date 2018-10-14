import React, { Component } from 'react';
import Button from './Button'
import AnimalList from './AnimalList';
import './App.css';

class App extends Component {
  state = {
    animals: [],
    loading: false
  }

  handleClickGetAnimals = () => {
    // no need to fetch if animals are already set
    // TODO: be smarter about caching; e.g. fetch if older than a minute
    if (!this.state.animals.length) {
      this.setState({ loading: true });
      this.fetchAnimals()
        .then(animals => {
          // display "loading" for a minimum amount of time to prevent flicker on fast connections
          setTimeout(() => this.setState({ animals, loading: false }), 500);
        });
    }
  }
  
  fetchAnimals = async () => {
    return await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3002/' : '/.netlify/functions/index'}`)
      .then(response => response.json());
  }

  render() {
    const isButtonDisabled = this.state.loading || this.state.animals.length;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ghost Animals</h1>
        </header>
        <div>
          <p><Button onClick={this.handleClickGetAnimals} disabled={isButtonDisabled}>Get spooky animals!</Button></p>
          {this.state.loading && <p>Loading...</p>}
          <AnimalList animals={this.state.animals} />
        </div>
      </div>
    );
  }
}

export default App;
