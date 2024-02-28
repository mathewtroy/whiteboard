// ActionControls.js
import React, { Component } from 'react';

/**
 * ActionControls component for the Whiteboard.
 * It provides buttons for actions like clearing the canvas, undoing,
 * redoing actions, and saving the image.
 */
class ActionControls extends Component {
  render() {
    
    // Destructuring props to access the provided functions
    const { clearAll, undo, redo, saveImage } = this.props;

    return (
      <div className="action-controls">

        <div className="navbar">
        
            {/* Rotating logo image */}
            <img 
              src={`${process.env.PUBLIC_URL}/images/circle.png`} 
              className="rotating-icon" 
              alt="Rotating logo" />    

            {/* Button to clear the canvas */}
            <button onClick={clearAll} className="button">Clear</button>

            {/* Button to undo the last action */}
            <button onClick={undo} className="button">Undo</button>

            {/* Button to redo the previously undone action */}
            <button onClick={redo} className="button">Redo</button>

            {/* Button to save the canvas as an image */}
            <button onClick={saveImage} className="button">Save</button>

            {/* Audio element for playing sounds (e.g., on undo action) */}
            <audio id="undoSound" 
              src={`${process.env.PUBLIC_URL}/sounds/cursor.wav`} 
              preload="auto"></audio>

        </div>

      </div>
    );
  }
}

export default ActionControls;
