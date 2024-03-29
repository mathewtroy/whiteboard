// Whiteboard.js
import React, { Component  } from 'react';
import Toolbar from './Toolbar';
import ActionControls from './ActionControls';
import './css/whiteboard.css'; 

/**
 * Whiteboard component to handle drawing operations.
 */
class Whiteboard extends Component {
    constructor(props) {
      super(props);
      this.canvas = React.createRef(); // Reference to the canvas element
      this.undoStack = [];  // Stack to keep track of previous states for undo
      this.redoStack = [];  // Stack to keep track of undone states for redo
      this.state = {
        color: '#000000',   // Current drawing color
        size: 6,            // Current brush size
        isDrawing: false,   // Flag to track drawing status
        showSaveForm: false, // Added a new state for displaying the save form
        filename: '', // Default file name
      };
    }
  
    /**
     * Sets up the canvas once the component mounts.
     */
    componentDidMount() {
      this.setUpCanvas();
    }
  
    /**
     * Initializes the canvas settings.
     */
    setUpCanvas = () => {
      const canvas = this.canvas.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.ctx = canvas.getContext('2d');
      this.ctx.lineCap = 'round';     // Rounded end of the lines
      this.ctx.lineJoin = 'round';    // Rounded join of the lines
      canvas.style.touchAction = 'none';// Disables gesture zooming on touch devices

    }
  
    /**
     * Clears the entire canvas.
     */
    clearAll = () => {
      this.ctx.clearRect(0, 0, this.canvas.current.width, 
        this.canvas.current.height);
    }
  
    /**
     * Starts the drawing process.
     * @param {*} e - Event object
     */
    startDraw = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = e.target.getBoundingClientRect();
      this.ctx.beginPath();
      this.ctx.moveTo(clientX - rect.left, clientY - rect.top);
      this.setState({ isDrawing: true });
    }
      

/**
 * Continues the drawing process as the pointer moves.
 * @param {*} e - Event object
 */
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
      
    /**
     * Stops the drawing process.
     * @param {*} e - Event object
     */
    stopDraw = (e) => {
      if (this.state.isDrawing) {
        this.ctx.closePath();
        this.setState({ isDrawing: false });
        this.saveState();
      }
    }
    
    /**
     * Saves the current canvas state for undo functionality.
     */
    saveState = () => {
      const currentState = this.canvas.current.toDataURL();
      this.undoStack.push(currentState);
      this.redoStack = []; // Clear redoStack after new action
    }
    
    /**
     * Undoes the last drawing action.
     */
    undo = () => {
      if (this.undoStack.length > 0) {
        this.redoStack.push(this.undoStack.pop());
        this.playUndoSound();
        this.restoreCanvasState(this.undoStack[this.undoStack.length - 1] || null);
      }
    }
    
    /**
     * Redoes the last undone action.
     */
    redo = () => {
      if (this.redoStack.length > 0) {
        const nextState = this.redoStack.pop();
        this.undoStack.push(nextState);
        this.restoreCanvasState(nextState);
      }
    }
  
    /**
     * Restores a saved canvas state.
     * @param {*} state - The canvas state to restore
     */
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
    
    /**
     * Plays an undo sound effect.
     */
    playUndoSound = () => {
      const sound = document.getElementById("undoSound");
      if (sound) {
        sound.play();
      }
    }
    
    /**
     * Toggles the visibility of the save form.
     * @param {boolean} show - A boolean indicating whether 
     * to show or hide the save form.
     */
    toggleSaveForm = (show) => {
      this.setState({ showSaveForm: show });
    }

    /**
     * Handles the change event for the filename input in the save form.
     * @param {Object} e - The event object.
     */
    handleFilenameChange = (e) => {
      this.setState({ filename: e.target.value });
    }
  
    /**
     * Handles the form submission in the save form.
     * Prevents the default form submission, saves the image with the custom 
     * filename, and hides the save form after successful submission.
     * @param {Object} e - The event object.
     */
    handleSaveFormSubmit = (e) => {
      e.preventDefault(); // Предотвратить отправку формы
      const { filename } = this.state;
      if (filename) {
        this.saveImageWithCustomName(filename);
        this.toggleSaveForm(false); // Скрыть форму после сохранения
      }
    }

    /**
     * Initiates the process of saving the current drawing as an image.
     */
    saveImage = () => {
      this.toggleSaveForm(true); 
    }
    
    /**
     * Saves the current drawing as an image file with a custom filename.
     * @param {string} filename - The custom filename provided by the user.
     */
    saveImageWithCustomName = (filename) => {
      const fileNameWithExtension = `${filename}.png`;
      const image = this.canvas.current.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = fileNameWithExtension;
      link.href = image;
      link.click();
    }

    /**
     * Activates the eraser tool by setting the stroke color to white.
     * This assumes the canvas background is white.
     */
    activateEraser = () => {
      this.setState({ color: '#FFFFFF' }); 
    }

    /**
     * Activates the marker tool by setting the stroke color to black
     * and resetting the stroke size to a default value.
     */
    activateMarker = () => {
      this.setState({ color: '#000000', size: 6 }); 
    }
    
    
  /**
   * Renders the Whiteboard component with toolbar and action controls.
   * Includes the canvas element where drawing takes place.
   * @returns The rendered JSX for the Whiteboard component.
   */
    render() {
      const { color, size, showSaveForm, filename } = this.state;
  
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
          showSaveForm={showSaveForm} // Передаем состояние формы в ActionControls
          filename={filename} // Передаем имя файла в ActionControls
          toggleSaveForm={this.toggleSaveForm}
          handleFilenameChange={this.handleFilenameChange}
          handleSaveFormSubmit={this.handleSaveFormSubmit}
        />
        <canvas
          ref={this.canvas}
          onPointerDown={this.startDraw}
          onPointerUp={this.stopDraw}
          onPointerMove={this.draw}
        />
        
      </section>
      );
    }
  }

  
  export default Whiteboard;
