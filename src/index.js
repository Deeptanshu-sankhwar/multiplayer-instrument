import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import io from "socket.io-client";
import Menu from './innerIndex';

export const socket = io();

function sendRoomToJoin()    {
    var room = document.getElementById("myRoomJoin").value;
    socket.emit('roomToJoin', room);
}

//open up instrument choice menu
function openMenu() {
    sendRoomToJoin();
    ReactDOM.render(
        <React.StrictMode>
            <Menu />
        </React.StrictMode>,
        document.getElementById('root')
    );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Home extends Component {

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
                            <input type="text" placeholder="enter room id to join/create" id="myRoomJoin" />
                            <button type="button" onClick={openMenu}>Join</button>
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
ReactDOM.render(<Home />, document.getElementById("root"));

export default Home;
