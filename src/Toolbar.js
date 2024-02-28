// Toolbar.js
import React, { Component } from 'react';

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
          
            {/* Color picker input for selecting drawing color */}
            <input 
                type="color" 
                className="button color-picker" 
                value={color}
                onChange={onChangeColor}
            />

            {/* Range slider for selecting brush size */}
            <input 
                type="range" 
                min="1" 
                max="200" 
                className="button size-slider" 
                value={size}
                onChange={onChangeSize}
            />

            {/* Button (represented by an image) to activate the eraser tool */}
            <img 
                src={`${process.env.PUBLIC_URL}/images/eraser.png`} 
                alt="Eraser"
                className="button eraser-icon "
                onClick={activateEraser}
                width="48"
                height="48"
            />

            {/* Button (represented by an image) to activate the marker tool */}
            <img
                src={`${process.env.PUBLIC_URL}/images/marker.png`} 
                alt="Marker"
                className="button marker-icon"
                onClick={activateMarker} 
                width="48"
                height="48"
            />

        </div>
      </div>
    );
  }
}

export default Toolbar;
