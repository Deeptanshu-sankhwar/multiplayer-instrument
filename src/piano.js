import React, {Component, useState} from "react";
import "./App.css";
import MIDISounds from "midi-sounds-react";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { socket } from ".";


function home(){
      window.location.reload();
}

class Piano extends Component {
  shiftKey = 0;
  colorOn = 'x';
  playtime = 0.5;
  chords = 0;
  //to track the status of recording
  state = {
    recordStatus: false,
    recordTune: {
      beatPlayed: [],
      lengthPlayed: [],
      timePlayed: []
    }
  };

  changeColor(key) {
    this.colorOn = key;
  }

  sendKeysFromPiano(sound)  {
    socket.emit('sendFromPiano', sound);
  }

  playPiano4(key, e) {
    if (key === "space") {
      this.playtime = this.playtime % 2 + 0.5
    }



    if (key === 'shift') {
      this.shiftKey = (this.shiftKey + 1) % 3
    }

    if (key === 'm'){
      this.chords = (this.chords + 1) % 3
    }

    let playtime = this.playtime;

    //don't delete...don't know why but we need this
    this.setState({});

    //create map of key to note
    const mapping = [
      ['a', 57],
      ['w', 58],
      ['s', 59],
      ['d', 60],
      ['r', 61],
      ['f', 62],
      ['t', 63],
      ['g', 64],
      ['h', 65],
      ['u', 66],
      ['j', 67],
      ['i', 68],
      ['k', 69],
      ['o', 70],
      ['l', 71],
      [';', 72]
    ];

    let sound = null;

    //if key is pressed, finds that key in the map and play corresponding note
    if (this.shiftKey === 0) {
      if (this.chords === 0) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1]], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1]], playtime);
          }
        }
      }
      else if (this.chords === 1) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1], map[1]+4, map[1]+7], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1], map[1]+4, map[1]+7], playtime);
          }
        }
      }
      else{
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1], map[1]+3, map[1]+7], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1], map[1]+3, map[1]+7], playtime);
          }
        }
      }
    }
    //go up an octave
    else if (this.shiftKey === 1) {
      if (this.chords === 0) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] + 12], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] + 12], playtime);
          }
        }
      }
      else if (this.chords === 1) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] + 12, map[1] + 16, map[1] + 19], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] + 12, map[1] + 16, map[1] + 19], playtime);
          }
        }
      }
      else {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] + 12, map[1] + 15, map[1] + 19], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] + 12, map[1] + 15, map[1] + 19], playtime);
          }
        }
      }
    }
    //go down an octave
    else if (this.shiftKey === 2) {
      if (this.chords === 0) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] - 12], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] - 12], playtime);
          }
        }
      }
      else if (this.chords === 1) {
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] - 12, map[1]-8, map[1]-5], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] - 12, map[1]-8, map[1]-5], playtime);
          }
        }
      }
      else{
        for (const map of mapping) {
          if (key === map[0]) {
            sound = {note:[map[1] - 12, map[1]-9, map[1]-5], length:playtime};
            // this.midiSounds.playChordNow(3, [map[1] - 12, map[1]-9, map[1]-5], playtime);
          }
        }
      }
    }
    if (sound != null) {
      this.midiSounds.playChordNow(3, sound.note, sound.length);
      this.sendKeysFromPiano(sound);
      if (this.state.recordStatus)  {
        this.state.recordTune.beatPlayed.push(sound.note);
        this.state.recordTune.lengthPlayed.push(sound.length);
        this.state.recordTune.timePlayed.push(new Date());
        console.log(this.state.recordTune);
      }
    }

  }
  //flip record status from recording to not recording and vice versa
  toggleRecordStatus()  {
    this.state.recordStatus = !this.state.recordStatus;
    if (this.state.recordStatus) {
      document.getElementById('record-btn').innerHTML = 'Stop';
    }
    else{
      document.getElementById('record-btn').innerHTML = 'Record';
      document.getElementById('play-btn').disabled = false;
    }
  }
  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  async playRecord() {
    console.log('playing');
    for (let i = 0; i < this.state.recordTune.beatPlayed.length; i++) {
      await this.midiSounds.playChordNow(3, this.state.recordTune.beatPlayed[i], this.state.recordTune.lengthPlayed[i]);
      console.log(i);
      await this.wait(this.state.recordTune.timePlayed[i+1] - this.state.recordTune.timePlayed[i]);
    }
  }


  //delete the previously recorded beats to start recording again from scratch
  resetRecord(){
    this.setState({ recordTune: {
      beatPlayed: [],
      lengthPlayed: [],
      timePlayed: []
    }
  });
  }



  render(){
    //send guitar chords played
    socket.on('receiveFromGuitar', (selectedNote) => {
      this.midiSounds.playChordNow(258, selectedNote, 1.5);
    });

    //send drum beats played
    socket.on('receiveFromDrums', (key) => {
      this.midiSounds.playDrumsNow(key);
    });

    //send piano played from other user (would this work? -> yes it will :)
    socket.on('receiveFromPiano', (sound) => {
      this.midiSounds.playChordNow(3, sound.note, sound.length);
    });


    /*formatting stuff mostly. Buttons call piano functions when clicked. The midi sounds logo gives volume options etc*/
    return (
        <div className="App">
          <header id = 'main-header'>
            <div className="container">
              <h1 contentEditable>Travel Ban<span style={{color: '#9a0415'}}>d</span></h1>
            </div>
          </header>
          <nav id="navbar">
            <div className="container">
              <ul>
                <li><a onClick={home}>Home</a></li>
                <li><a id="record-btn" onClick={this.toggleRecordStatus.bind(this)}>Record</a></li>
                <li><a id="play-btn" onClick={this.playRecord.bind(this)}>Play</a></li>
                <li><a onClick={this.resetRecord.bind(this)}>Reset</a></li>
              </ul>
            </div>
          </nav>
          <body>
          <p className="App-intro">Press buttons to play piano chords.</p>
          <h1 className="Instructions">Play keyboard like a piano: d = middle C.</h1>
          <p>
            <KeyboardEventHandler
                handleKeys={['all']}
                onKeyEvent={(key) =>
                    this.changeColor(key)
                } />
            <KeyboardEventHandler
                handleKeys={['all']}
                onKeyEvent={(key, e) =>
                    this.playPiano4(key, e)} />
          </p>
          <p>
            <div className = 'piano-visual'>
              <div className={this.colorOn === 'a' ? 'blue-key' : "white-key"} style={{left: 50}}>
                <h3>A</h3>
                <h4>a</h4>
              </div>
              <div className={this.colorOn === 's'? "blue-key" : "white-key"} style={{left:100}}>
                <h3>B</h3>
                <h4>s</h4>
              </div>
              <div className={this.colorOn === 'd' ? 'blue-key' : "white-key"} style={{left:150}}>
                <h3>C</h3>
                <h4>d</h4>
              </div>
              <div className={this.colorOn === 'f' ? 'blue-key' : "white-key"} style={{left:200}}>
                <h3>D</h3>
                <h4>f</h4>
              </div>
              <div className={this.colorOn === 'g' ? 'blue-key' : "white-key"} style={{left:250}}>
                <h3>E</h3>
                <h4>g</h4>
              </div>
              <div className={this.colorOn === 'h' ? 'blue-key' : "white-key"} style={{left:300}}>
                <h3>F</h3>
                <h4>h</h4>
              </div>
              <div className={this.colorOn === 'j' ? 'blue-key' : "white-key"} style={{left:350}}>
                <h3>G</h3>
                <h4>j</h4>
              </div>
              <div className={this.colorOn === 'k' ? 'blue-key' : "white-key"} style={{left:400}}>
                <h3>A</h3>
                <h4>k</h4>
              </div>
              <div className={this.colorOn === 'l' ? 'blue-key' : "white-key"} style={{left:450}}>
                <h3>B</h3>
                <h4>l</h4>
              </div>
              <div className={this.colorOn === ';' ? 'blue-key' : "white-key"} style={{left:500}}>
                <h3>C</h3>
                <h4>;</h4>
              </div>
              <div className={this.colorOn === 'w' ? 'black-blue-key' : "black-key"} style={{left: 85}}>
                <h4>A#</h4>
                <h5>w</h5>
              </div>
              <div className={this.colorOn === 'r' ? 'black-blue-key' : "black-key"} style={{left: 185}}>
                <h4>C#</h4>
                <h5>r</h5>
              </div>
              <div className={this.colorOn === 't' ? 'black-blue-key' : "black-key"} style={{left: 235}}>
                <h4>D#</h4>
                <h5>t</h5>
              </div>
              <div className={this.colorOn === 'u' ? 'black-blue-key' : "black-key"} style={{left: 335}}>
                <h4>F#</h4>
                <h5>u</h5>
              </div>
              <div className={this.colorOn === 'i' ? 'black-blue-key' : "black-key"} style={{left: 385}}>
                <h4>G#</h4>
                <h5>i</h5>
              </div>
              <div className={this.colorOn === 'o' ? 'black-blue-key' : "black-key"} style={{left: 435}}>
                <h4>A#</h4>
                <h5>o</h5>
              </div>
            </div>
          </p>

          <p><h3>Press shift to change octave</h3></p>
          <p>Current Octave: {this.shiftKey === 0 ? "Medium" : (this.shiftKey === 1 ? "High" : "Low")}</p>
          <p><h3>Hit Space to change length of the note.</h3></p>
          <p>Current note length: {this.playtime === 0.5 ? "Short" : (this.playtime === 1 ? "Medium" : (this.playtime === 1.5 ? "Long" : "Longest"))}</p>
          <p><h3>Press m for chords.</h3></p>
          <p>Current chord setting: {this.chords === 0 ? "Off" : (this.chords === 1 ? "Major" : "Minor")}</p>
          <p><h3>Hit Refresh to change instrument</h3></p>

          <MIDISounds
              ref={ref => (this.midiSounds = ref)}
              appElementName="root"
              instruments={[3, 258]}
          />
          </body>
        </div>
    );
  }
}

export default Piano;
