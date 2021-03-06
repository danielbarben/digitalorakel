//Functional component
//Renders the conclusion
//Takes as Props: user, bot, id

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import Botrender from '../Botrender'
import Userrender from '../Userrender'
import api from '../../api.js'

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickable: true,
      text: ''
    }
  }

  componentDidMount() {
    // fetch statistics
    fetch(`${api}/statistics/${this.props.id}`)
    .then(res => res.json())
    .then(item => {
      let beautify = item.map((item, index) => <span className='conclusion' key={index}>{item.count}% {item.item}<br></br></span>);
      let beautify2 = <p key={100}>Meine Orakelsprüche:<br></br>{beautify}</p>
      this.setState({
        text: beautify2
      })
    })
  }

  render() {
    if (!this.state.text) {
      return (
      <Spinner />
      )
    } else {
      return (
      <div>
        <Botrender bot={this.props.bot} text={this.state.text}/>
        <Userrender user={this.props.user} text={<>
        {/* Noch einmal */}
        <p className = {this.state.clickable ? 'button' : ''}><Link to='./'>Bitte noch einmal Spielen!</Link></p>
        </>}/>
        </div>)
    } 
  }
}

export default Statistics;