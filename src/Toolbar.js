// Toolbar.js
import React, { Component } from 'react';

class Toolbar extends Component {
  render() {
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
          
            <input 
                type="color" 
                className="button color-picker" 
                value={color}
                onChange={onChangeColor}
            />

            <input 
                type="range" 
                min="1" 
                max="200" 
                className="button size-slider" 
                value={size}
                onChange={onChangeSize}
            />

            <img 
                src={`${process.env.PUBLIC_URL}/images/eraser.png`} 
                alt="Eraser"
                className="button eraser-icon "
                onClick={activateEraser}
                width="48"
                height="48"
            />

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
