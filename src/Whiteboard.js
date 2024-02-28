// Whiteboard.js
import React, { Component  } from 'react';
import Toolbar from './Toolbar';
import ActionControls from './ActionControls';
import './css/whiteboard.css'; 

class Whiteboard extends Component {
    constructor(props) {
      super(props);
      this.canvas = React.createRef();
      this.undoStack = [];
      this.redoStack = [];
      this.state = {
        color: '#000000',
        size: 6,
        isDrawing: false
      };
    }
  
    componentDidMount() {
      this.setUpCanvas();
    }
  
    setUpCanvas = () => {
      const canvas = this.canvas.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.ctx = canvas.getContext('2d');
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round'; 

    }
  
    clearAll = () => {
      this.ctx.clearRect(0, 0, this.canvas.current.width, 
        this.canvas.current.height);
      this.undoStack = [];
      this.redoStack = [];
    
    }
  
    startDraw = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = e.target.getBoundingClientRect();
      this.ctx.beginPath();
      this.ctx.moveTo(clientX - rect.left, clientY - rect.top);
      this.setState({ isDrawing: true });
    }
      


    draw = (e) => {
      if (!this.state.isDrawing) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = e.target.getBoundingClientRect();
      const { color, size } = this.state;
      this.ctx.lineWidth = size;
      this.ctx.strokeStyle = color;
      this.ctx.lineTo(clientX - rect.left, clientY - rect.top);
      this.ctx.stroke();
    }
      
    stopDraw = (e) => {
      if (this.state.isDrawing) {
        this.ctx.closePath();
        this.setState({ isDrawing: false });
        this.saveState();
      }
    }
    
    saveState = () => {
      const currentState = this.canvas.current.toDataURL();
      this.undoStack.push(currentState);
      this.redoStack = []; // Clear redoStack after new action
    }
    
    undo = () => {
      if (this.undoStack.length > 0) {
        this.redoStack.push(this.undoStack.pop());
        this.playUndoSound();
        this.restoreCanvasState(this.undoStack[this.undoStack.length - 1] || null);
      }
    }
    
    redo = () => {
      if (this.redoStack.length > 0) {
        const nextState = this.redoStack.pop();
        this.undoStack.push(nextState);
        this.restoreCanvasState(nextState);
      }
    }
  
    
    restoreCanvasState = (state) => {
      const img = new Image();
      if (state) {
        img.src = state;
        img.onload = () => {
          this.ctx.clearRect(0, 0, this.canvas.current.width, 
            this.canvas.current.height);

          this.ctx.drawImage(img, 0, 0, this.canvas.current.width, 
            this.canvas.current.height);
        };
      } else {
        this.clearAll();
      }
    }
    
    playUndoSound = () => {
      const sound = document.getElementById("undoSound");
      if (sound) {
        sound.play();
      }
    }
    
    saveImage = () => {
      const image = this.canvas.current.toDataURL("image/png").replace(
        "image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'my-drawing.png';
      link.href = image;
      link.click();
    }
    
    activateEraser = () => {
      this.setState({ color: '#FFFFFF' }); 
    }

    activateMarker = () => {
      this.setState({ color: '#000000', size: 6 }); 
    }
    
    
  
    render() {
      const { color, size } = this.state;
  
      return (
        <section>
        <Toolbar
          color={color}
          size={size}
          onChangeColor={(e) => this.setState({ color: e.target.value })}
          onChangeSize={(e) => this.setState({ size: e.target.value })}
          activateEraser={this.activateEraser}
          activateMarker={this.activateMarker}
        />
        <ActionControls
          clearAll={this.clearAll}
          undo={this.undo}
          redo={this.redo}
          saveImage={this.saveImage}
        />
        <canvas
          ref={this.canvas}
          onPointerDown={this.startDraw}
          onPointerMove={this.draw}
          onPointerUp={this.stopDraw}
          onPointerOut={this.stopDraw}
          // onTouchStart={this.startDraw}
          // onTouchMove={this.draw}
          // onTouchEnd={this.stopDraw}
        />
      </section>
      );
    }
  }

  
  export default Whiteboard;
