import React from 'react';
import { AcceptSave } from './components/AcceptSave';
import { NoAccept } from './components/NoAccept';

const SaveForm = ({ filename, handleFilenameChange, handleSaveFormSubmit, toggleSaveForm }) => {
  return (
    <div className="save-form">
      <form onSubmit={handleSaveFormSubmit}>
        <input
          type="text"
          className="filename-input"
          value={filename}
          onChange={handleFilenameChange}
          placeholder="Use only Latin letters"
          pattern="[A-Za-z]+"
          required
          id="save_filename"
        />
                
        {/* Submit button to save the image with the custom filename */}
        <button type="submit" className="button">
          <AcceptSave />
        </button>

        {/* Cancel button to hide the save form */}
        <button onClick={() => toggleSaveForm(false)} className="button">
          <NoAccept />
        </button>
      </form>
    </div>
  );
};

export default SaveForm;
