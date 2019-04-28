//Loads Twitterfunctin and Restarts the Game
//Takes Props id of conclusion and avatar of user

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Userrender from '../Userrender';
import Spinner from '../Spinner';
import api from '../../api.js'

class Conclusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitter: '',
      clickable: true
    }
  }
  
  componentDidMount () {
    fetch(`${api}/conclusions/${this.props.id}`)
    .then(res => res.json())
    .then(itemloaded => {
      this.setState({
        twitter: `https://twitter.com/intent/tweet?text=+${itemloaded.twittertext}`
      })
    })
  }

  render() {
    if (!this.state.twitter) {return <Spinner/>}
    else {
      return <div>
        <Userrender user={this.props.user} text={<>
        {/* Twittern */}
        <p className = {this.state.clickable ? 'button' : ''} onClick = {() => this.state.clickable ? window.open(this.state.twitter) : ''}>Ja, Orakelspruch twittern</p>
        {/* Noch einmal */}
        <p className = {this.state.clickable ? 'button' : ''}><Link to='./'>Nein, noch einmal, bitte!</Link></p>
        {/*<p className = {this.state.clickable ? 'button' : ''} onClick = ''><Link to='./'>Nein, noch einmal, bitte!</Link></p> */}
        {/* Statistik */}
        <p className = {this.state.clickable ? 'button' : ''} onClick = {() => this.state.clickable ? this.props.showStatistics(this.props.id) : ''}>Was hast Du den anderen geraten?</p>
        </>}/>
     </div>
    }
  }
}

export default Conclusion;