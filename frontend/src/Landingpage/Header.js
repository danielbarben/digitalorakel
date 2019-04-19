import React, { Component } from 'react';
import HeaderImg from '../img/header.png';
import './landingpage.css';

class Header extends Component {

  render() {

    const content = <div className='header'><a href='//digitalorakel.ch'><img src={HeaderImg} className='headerImg' key='12' alt='digitalOrakel'/><h1>digitalOrakel</h1><p>Wir helfen Dir bei wichtigen<br/>und weniger wichtigen Entscheidungen</p></a></div>
    return <div>{content}</div>
  }
}

export default Header;