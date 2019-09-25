import React, { Component } from 'react';
import '../Styles/Joke.scss';

export class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return '#4CAF50';
    } else if (this.props.votes >= 12) {
      return '#8BC34A';
    } else if (this.props.votes >= 9) {
      return '#CDDC39';
    } else if (this.props.votes >= 6) {
      return '#FFEB3B';
    } else if (this.props.votes >= 3) {
      return '#FFC107';
    } else if (this.props.votes >= 0) {
      return '#FF9800';
    } else {
      return '#f44336';
    }
  }

  getEmoji() {
    const { joke } = this.props;
    if (joke.votes >= 15) {
      return 'em em-rolling_on_the_floor_laughing';
    } else if (joke.votes >= 12) {
      return 'em em-laughing';
    } else if (joke.votes >= 9) {
      return 'em em-smiley';
    } else if (joke.votes >= 6) {
      return 'em em-slightly_smiling_face';
    } else if (joke.votes >= 3) {
      return 'em em-neutral_face';
    } else if (joke.votes >= 0) {
      return 'em em-confused';
    } else {
      return 'em em-angry';
    }
  }

  render() {
    const { joke } = this.props;
    return (
      <div className='Joke'>
        <div className='Joke-buttons'>
          <span className='Joke-votes' style={{ borderColor: this.getColor() }}>
            {joke.votes}
          </span>
          <i className='fas fa-thumbs-up' onClick={this.props.upvote} />

          <i className='fas fa-thumbs-down' onClick={this.props.downvote} />
        </div>
        <div className='Joke-text'>{joke.text}</div>
        <div className='Joke-emoji'>
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
