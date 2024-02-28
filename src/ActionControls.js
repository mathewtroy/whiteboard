// ActionControls.js
import React, { Component } from 'react';

class ActionControls extends Component {
  render() {
    const { clearAll, undo, redo, saveImage } = this.props;

    return (
      <div className="action-controls">

        <div className="navbar">
            <img src="circle.png" className="rotating-icon" alt="Rotate logo" />      
            <button onClick={clearAll} className="button">Clear</button>
            <button onClick={undo} className="button">Undo</button>
            <button onClick={redo} className="button">Redo</button>
            <button onClick={saveImage} className="button">Save Image</button>
            <audio id="undoSound" src="cursor.wav" preload="auto"></audio>
        </div>

      </div>
    );
  }
}

export default ActionControls;
