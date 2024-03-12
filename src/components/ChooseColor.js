import React from 'react';

export function ChooseColor({ color, onChangeColor }) {
    // Ref to the hidden color input
    let inputRef = React.createRef();

    // Function to simulate click on the hidden color input
    const handleSvgClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="choose-color-container">
            {/* Hidden color input */}
            <input 
                ref={inputRef}
                type="color" 
                className="hidden-color-input" 
                value={color}
                onChange={onChangeColor}
            />

        </div>
    );
}
