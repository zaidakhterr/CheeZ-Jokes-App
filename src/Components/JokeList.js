import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import uuid from 'uuid';
import Joke from './Joke';

import '../Styles/JokeList.scss';

export class JokeList extends Component {
  static defaultProps = {
    nJokes: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      isLoading: true,
    };

    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
    else this.setState({ isLoading: false });
  }

  async getJokes() {
    try {
      let jokes = [];
      while (jokes.length < this.props.nJokes) {
        let response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        }
      }
      this.setState(
        st => ({
          isLoading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ isLoading: true }, this.getJokes);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className='JokeList-spinner JokeList-title'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1>Getting Jokes ...</h1>
        </div>
      );
    }

    this.state.jokes.sort((a, b) => b.votes - a.votes);

    return (
      <div className='JokeList'>
        <header className='JokeList-header'>
          <h1>
            CheeZ <span>Jokes</span>
          </h1>
          <img
            src='https://pngpicture.com/wp-content/uploads/2018/12/laughing-crying-emoji-flat-png.png'
            alt='haha emoji'
          />
          <button onClick={this.handleClick}>Get Jokes</button>
        </header>

        <main className='JokeList-jokes'>
          {this.state.jokes.map(joke => (
            <Joke
              key={joke.id}
              joke={joke}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default JokeList;
