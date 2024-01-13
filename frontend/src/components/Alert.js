import React, { useState } from "react";
//import { Link } from "react-router-dom";

//style
import '../styling/App.css'

const Alert = ({ variant }) => {
  const [open, setOpen] = useState(true);
  if (open)
    return (
      <div
        className="alert-container"
        style={{
          background: variant.mainColor,
          border: "0.1rem solid " + variant.secondaryColor,
        }}
      >
        <div
          className="symbol-container"
          style={{ background: variant.secondaryColor }}
        >
          <span className="material-symbols-outlined symbol">{variant.symbol}</span>{" "}
        </div>
        <div className="description-container">
          <span className="description-text"  >{variant.text}</span>
        </div>
        
        {/*
        <div className="buttons_options">
            <button><Link to="/">Homepage</Link></button>
        </div>
         */}
        <a className="symbol-close-link" onClick={() => setOpen(false)}>
        <span className="material-symbols-outlined symbol" style={{color: variant.secondaryColor}}>cancel</span>{" "}
        </a>
        </div>
    );
};
export default Alert;