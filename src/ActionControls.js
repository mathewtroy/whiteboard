// ActionControls.js
import React, { Component } from 'react';
import { ClearAll } from './components/ClearAll';
import { UndoCircle } from './components/UndoCircle';
import { RedoCircle } from './components/RedoCircle';
import { SaveDrawing } from './components/SaveDrawing';
import SaveForm from './SaveForm';


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
            <button onClick={clearAll} className="button"><ClearAll /></button>

            {/* Button to undo the last action */}
            <button onClick={undo} className="button"><UndoCircle /></button>

            {/* Button to redo the previously undone action */}
            <button onClick={redo} className="button"><RedoCircle /></button>

            {/* Button to save the canvas as an image */}
            <button onClick={() => saveImage()} className="button"><SaveDrawing /></button>

            {/* Audio element for playing sounds (e.g., on undo action) */}
            <audio id="undoSound" 
              src={`${process.env.PUBLIC_URL}/sounds/cursor.wav`} 
              preload="auto"></audio>

        </div>

        {showSaveForm && (
          <SaveForm
            filename={filename}
            handleFilenameChange={handleFilenameChange}
            handleSaveFormSubmit={handleSaveFormSubmit}
            toggleSaveForm={toggleSaveForm}
          />
        )}

      </div>
    );
  }
}

export default ActionControls;
