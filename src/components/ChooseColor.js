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
                style={{ display: 'none' }} // Make sure the color input is not visible
            />
            {/* SVG Icon that when clicked, opens the color picker */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48px" 
                height="48px" 
                viewBox="0 0 100 100" 
                onClick={handleSvgClick} 
                style={{ cursor: 'pointer', fill: color }} // The fill color represents the current color
            >
                <path fill="currentColor" d="M44.55 10.521C18.234 10.521 0 31.574 0 42.101c0 10.525 5.263 18.42 15.79 18.42c10.526 0 15.789 2.631 15.789 10.526c0 10.527 7.895 18.421 18.42 18.421c34.211 0 50-18.42 50-36.842c0-31.579-23.87-42.105-55.449-42.105m-7.024 10.526a6.58 6.58 0 1 1 0 13.159a6.58 6.58 0 0 1 0-13.159m21.053 0a6.58 6.58 0 1 1 0 13.159a6.58 6.58 0 0 1 0-13.159M77.63 31.574a6.579 6.579 0 1 1 0 13.157a6.579 6.579 0 0 1 0-13.157m-58.526 1.263a6.58 6.58 0 1 1 0 13.158a6.58 6.58 0 0 1 0-13.158M54 63.152a7.895 7.895 0 0 1 7.895 7.895c0 4.36-5.535 7.895-9.895 7.895a7.895 7.895 0 0 1-7.895-7.895c0-4.36 5.535-7.895 9.895-7.895" />
            </svg>
        </div>
    );
}