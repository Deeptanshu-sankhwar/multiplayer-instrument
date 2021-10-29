import React, {Component} from 'react';
import "./App.css";
import MIDISounds from 'midi-sounds-react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {socket} from './index';

function home(){
    window.location.reload();
}


class Guitar extends Component {
    //to track the status of recording
    shiftKey = 0;
    chords = 0;
    base = 60;
    strum = false;

    state = {
        recordStatus: false,
        recordTune: {
            beatPlayed : [],
            timePlayed : []
        }
    };

    mapping = [
        ['a', 45],
        ['b', 47],
        ['c', 48],
        ['d', 50],
        ['e', 52],
        ['f', 53],
        ['g', 55],
    ];

    playTune(selectedNote)    {
        this.midiSounds.playChordNow(258, selectedNote, 1.5);
    }

    playNote(key, shiftKey, chords) {
        let selectedNote = [];
        for (const map of this.mapping) {

            if (shiftKey === 0) {
                if (chords === 0) {
                    if (key === map[0]) {
                        if (this.strum) {
                            selectedNote = [map[1], map[1] + 7, map[1] + 12, map[1] + 16, map[1] + 19];
                        }
                        else{
                            selectedNote = [map[1], map[1] + 7, map[1] + 12];
                        }
                        return selectedNote;
                    }
                }
                if (chords === 1) {
                    if (key === map[0]) {
                        if (this.strum){
                            selectedNote = [map[1], map[1] + 7, map[1] + 12, map[1] + 15, map[1] + 19];
                        }
                        else{
                            selectedNote = [map[1], map[1] + 7, map[1] + 12];
                        }
                        return selectedNote;
                    }
                }
            }
            if (shiftKey === 1) {
                this.base = map[1] + 1;
                if (chords === 0) {
                    if (key === map[0]) {
                        if (this.strum) {
                            selectedNote = [this.base, this.base + 7, this.base + 12, this.base + 16, this.base + 19];
                        }
                        else{
                            selectedNote = [this.base, this.base + 7, this.base + 12];
                        }
                        return selectedNote;

                    }
                }
                if (chords === 1) {
                    if (key === map[0]) {
                        if (this.strum) {
                            selectedNote = [this.base, this.base + 7, this.base + 12, this.base + 16, this.base + 19];
                        }
                        else{
                            selectedNote = [this.base, this.base + 7, this.base + 12];
                        }
                        return selectedNote;

                    }
                }
            }
        }

        // for record function, copied from drum.js
        if (this.state.recordStatus)  {
            this.state.recordTune.beatPlayed.push(selectedNote);
            this.state.recordTune.timePlayed.push(new Date())
            console.log(this.state.recordTune);
        }
        return [];
    }

    //send notes from guitar to server
    sendKeysFromGuitar(selectedNote)  {
        socket.emit('sendFromGuitar', selectedNote);
    }



    playGuitar(key){
        if (key === 'shift') {
            this.shiftKey = (this.shiftKey + 1) % 2
        }

        if (key === 'm') {
            this.chords = (this.chords + 1) % 2
        }

        this.strum = !this.strum;

        this.setState({});


        const selectedNote = this.playNote(key, this.shiftKey, this.chords);
        if (selectedNote.length != 0)   {
            this.sendKeysFromGuitar(selectedNote);
            this.playTune(selectedNote);
        }
    }

    //////////////JUST COPIED PASTED RECORD CODE FROM DRUM.JS//////////////////////////
    //flip record status from recording to not recording and vice versa
    toggleRecordStatus()  {
        this.state.recordStatus = !this.state.recordStatus;
        if (this.state.recordStatus) {
            document.getElementById('record-btn').innerHTML = 'Stop';
            console.log(this.state.recordStatus)
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
    async playRecord() {
        console.log('playing');
        for (let i = 0; i < this.state.recordTune.beatPlayed.length; i++) {
            await this.midiSounds.playChordNow(258, this.state.recordTune.beatPlayed[i], 1.5);
            console.log(i);
            await this.wait(this.state.recordTune.timePlayed[i+1] - this.state.recordTune.timePlayed[i]);
        }
    }


    //delete the previously recorded beats to start recording again from scratch
    resetRecord(){
        this.setState({ recordTune: {
            beatPlayed: [],
            timePlayed: []
          }
        });
    }
    //////////////////COPY OF RECORD CODE ENDS HERE////////////////////////////////////////////


    render(){
        //send drum beats played
        socket.on('receiveFromDrums', (key) => {
            this.midiSounds.playDrumsNow(key);
        });

        //send piano played
        socket.on('receiveFromPiano', (sound) => {
            this.midiSounds.playChordNow(3, sound.note, sound.length);
        });

        //send guitar played from other users
        socket.on('receiveFromGuitar', (selectedNote) => {
          this.midiSounds.playChordNow(258, selectedNote, 1.5);
        });

        return(
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
                <p className="App-intro">Press the letter of the chord you want to play ('a' = A major).</p>
                <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => this.playGuitar(key)}/>
                <p>Click play only after you stop recording!#issue needs to be fixed-->disable playbutton while in recording mode</p>
                <div className='image'></div>
                <p><h3>Press shift to change between natural chords and sharp/flats.</h3></p>
                <p>Current chord type: {this.shiftKey === 0 ? "Natural" : "Sharp/Flat"}</p>
                <p><h3>Press m to toggle between major and minor chords.</h3></p>
                <p>Current chord setting: {this.chords === 0 ? "Major" : "Minor"}</p>
                <p><h3>Hit Refresh to change instrument</h3></p>

                <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[258, 3]}/>
            </div>
        )
    }
}

export default Guitar;
