import React, { Component  } from 'react';
import Toolbar from './Toolbar';
import ActionControls from './ActionControls';
import './whiteboard.css'; 

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
      this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
      this.undoStack = [];
      this.redoStack = [];
    
    }
  
    startDraw = (e) => {
      if (e.nativeEvent) {
        const { offsetX, offsetY } = e.nativeEvent;
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY);
      }
      this.setState({ isDrawing: true });
    }
      
    draw = (e) => {
      if (!this.state.isDrawing) return;
      if (e.nativeEvent) {
        const { offsetX, offsetY } = e.nativeEvent;
        const { color, size } = this.state;
        this.ctx.lineWidth = size;
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
      }
    }
      
    stopDraw = () => {
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
          this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
          this.ctx.drawImage(img, 0, 0, this.canvas.current.width, this.canvas.current.height);
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
      const image = this.canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'my-drawing.png';
      link.href = image;
      link.click();
    }
    
    activateEraser = () => {
      this.setState({ color: '#FFFFFF' }); // предполагаем, что фон белый
    }

    activateMarker = () => {
      this.setState({ color: '#000000', size: 6 }); // Сброс к стандартным значениям
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
          onMouseDown={this.startDraw}
          onMouseMove={this.draw}
          onMouseUp={this.stopDraw}
          onMouseOut={this.stopDraw}
          onTouchStart={this.startDraw}
          onTouchMove={this.draw}
          onTouchEnd={this.stopDraw}
        />
      </section>
      );
    }
  }

  
  export default Whiteboard;
