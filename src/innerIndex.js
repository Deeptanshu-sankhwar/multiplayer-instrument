import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Piano from './piano';
import Drum from './drum';
import Guitar from './guitar';
import {socket} from './index';

//send sockets attaching connection
function send(instrument) {
  socket.emit('selected instrument', instrument);

}

//opens up piano player
function openPiano()  {
  send("Piano");
  ReactDOM.render(
    <React.StrictMode>
      <Piano />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

//opens up guitar player
function openGuitar()  {
    send("Guitar");
    ReactDOM.render(
        <React.StrictMode>
            <Guitar />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

//opens up drum kit
function openDrum() {
  send("Drums");
  ReactDOM.render(
    <React.StrictMode>
      <Drum />
    </React.StrictMode>,
    document.getElementById('root')
  );
}



class Menu extends Component {

    render() {
        return(
            <div>
                <body>
                <header id="main-header">
                    <div className="container">
                        <h1 contentEditable>Travel Ban<span style={{color: '#9a0415'}}>d</span></h1>
                    </div>
                </header>
                <nav id="navbar">
                    <div className="container">
                        <ul>
                            <li><a onClick = "window.location.reload();">Home</a></li>
                            <li><a onClick = {openDrum}>Drums</a></li>
                            <li><a onClick = {openGuitar}>Guitar</a></li>
                            <li><a onClick = {openPiano}>Piano</a></li>
                        </ul>
                    </div>
                </nav>
                <section id="showcase"><div className="container">
                    <h1>Miss jamming out with your friends? Connect from anywhere and play together in real-time.
                    </h1>
                    <h2>Choose an instrument from the navbar to get started.</h2>
                </div></section>
                <section id="image"><div className="container"></div></section>
                </body>
                <footer id="main-footer">
                    <h3>Copyright 2020 Travel Band -- Image by HaoMin SiMa</h3>
                </footer>
            </div>
        );
    }
}

export default Menu;
