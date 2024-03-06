// Toolbar.js
import React, { Component } from 'react';
import { EraserCircle } from './components/EraserCircle';
import { MarkerSolid } from './components/MarkerSolid';
import { ChooseColor } from './components/ChooseColor';


/**
 * Toolbar component for the Whiteboard.
 * It provides controls for changing color, size, 
 * and tools like eraser and marker.
 */
class Toolbar extends Component {
  render() {
    
    // Destructuring props for easier access
    const { 
        color, 
        size, 
        onChangeColor, 
        onChangeSize, 
        activateEraser,
        activateMarker
    
    } = this.props;


    return (
      <div className="toolbar">

        <div className="tools">
          
            {/* Range slider for selecting brush size */}
            <input 
                type="range" 
                min="1" 
                max="200" 
                className="button size-slider" 
                value={size}
                onChange={onChangeSize}
            />

            {/* Color picker input for selecting drawing color */}
            <ChooseColor color={color} onChangeColor={onChangeColor} />

            {/* Button to activate the marker tool */}
            <button className="button marker-icon" onClick={activateMarker}>
              <MarkerSolid />
            </button>


            {/* Button to activate the eraser tool */}
            <button className="button eraser-icon" onClick={activateEraser}>
              <EraserCircle />
            </button>




        </div>
      </div>
    );
  }
}

export default Toolbar;
