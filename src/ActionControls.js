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
    const { clearAll, undo, redo, saveImage, showSaveForm, 
            filename, toggleSaveForm, handleFilenameChange, 
            handleSaveFormSubmit  
    } = this.props;

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
            <button onClick={undo} className="button">↩️</button>

            {/* Button to redo the previously undone action */}
            <button onClick={redo} className="button">↪️</button>

            {/* Button to save the canvas as an image */}
            <button onClick={() => saveImage()} className="button">Save</button>

            {/* Audio element for playing sounds (e.g., on undo action) */}
            <audio id="undoSound" 
              src={`${process.env.PUBLIC_URL}/sounds/cursor.wav`} 
              preload="auto"></audio>

        </div>

        {showSaveForm && (
          <div className="save-form">
            <form onSubmit={handleSaveFormSubmit}>
              <input
                type="text"
                className="filename-input"
                value={filename}
                onChange={handleFilenameChange}
                placeholder="Use only Latin letters"
                pattern ="[A-Za-z]+"
                required 
                id="save_filename"
              />
                    
              {/* Submit button to save the image with the custom filename */}
              <button type="submit" className="button">☑️</button>

              {/* Cancel button to hide the save form */}
              <button onClick={() => toggleSaveForm(false)} className="button">
              ❌</button>
            </form>
          </div>
        )}

      </div>
    );
  }
}

export default ActionControls;
