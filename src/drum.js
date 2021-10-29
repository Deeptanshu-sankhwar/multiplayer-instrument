import React, { Component } from 'react';
import './drum.css';
import MIDISounds from 'midi-sounds-react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {socket} from './index';



function home(){
  window.location.reload();
}


class Drum extends Component {

  //to track the status of recording
  state = {
    recordStatus: false,
    recordTune: {
      beatPlayed : [],
      timePlayed : []
    },
  }

  selectedDrum = [];

  //play beat of selected drum component
  playBeat(selectedDrum) {
    this.midiSounds.playDrumsNow([selectedDrum]);

    if (this.state.recordStatus)  {
      this.state.recordTune.beatPlayed.push(selectedDrum);
      this.state.recordTune.timePlayed.push(new Date())
      console.log(this.state.recordTune);
    }
  }

  //send keys from drum to server
  sendKeysFromDrums(key)  {
    socket.emit('sendFromDrums', key);
  }

  //handles keyboard input to play beat when corresponding key is pressed
  playDrum(key) {

    switch(key) {
      case 'f': //Cymbal
        this.playBeat(110);
        this.sendKeysFromDrums([110]);
        break;

      case 'g': //Low Tom
        this.playBeat(40);
        this.sendKeysFromDrums([40]);
        break;

      case 't': //Mid Tom
        this.playBeat(60);
        this.sendKeysFromDrums([60]);
        break;

      case 'b': //Bass Drum
        this.playBeat(5);
        this.sendKeysFromDrums([5]);
        break;

      case 'y': //High Tom
        this.playBeat(75);
        this.sendKeysFromDrums([75]);
        break;

      case 'h': //Snare Drum
        this.playBeat(15);
        this.sendKeysFromDrums([15]);
        break;

      case 'j': //Hi-Hat
        this.playBeat(35);
        this.sendKeysFromDrums([35]);
        break;
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

  //asynchronous function that plays the recorded beats at an interval of 1 second each
  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  async playRecord()  {
    console.log('playing')
    for (let i = 0; i < this.state.recordTune.beatPlayed.length; i++)  {
      await this.playBeat(this.state.recordTune.beatPlayed[i]);
      console.log(i);
      await this.wait(this.state.recordTune.timePlayed[i+1] - this.state.recordTune.timePlayed[i]);
    }
  }

  //delete the previously recorded beats to start recording again from scratch
  resetRecord() {
    this.setState({ recordTune: {
        beatPlayed: [],
        timePlayed: []
      }
    });
  }

  render()  {
    //send guitar chords played
    socket.on('receiveFromGuitar', (selectedNote) => {
      this.midiSounds.playChordNow(258, selectedNote, 1.5);
    });

    //send piano played
    socket.on('receiveFromPiano', (sound) => {
      this.midiSounds.playChordNow(3, sound.note, sound.length);
    });

    //send drum played from other users
    socket.on('receiveFromDrums', (key) => {
        this.midiSounds.playDrumsNow(key);
    });

    return (
      <div className="Drum">
        <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => this.playDrum(key)} />
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
        <p>Click play only after you stop recording!#issue needs to be fixed-->disable playbutton while in recording mode</p>

        <div className='relative'>
         <img src = "assets/images/drum_kit.png"></img>
        </div>

        <p>Hit Refresh to change instrument</p>

        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[258, 3]} />
      </div>
    );
  }
}

export default Drum;
