import React from 'react';
import '../TestWitheDummyData/test.css'; // Import CSS file

export const TestComponent = () => { // Renamed the component to follow React component naming convention
  return (
    <>
      <div className="static"> {/* Use className instead of class in JSX */}
        <h1 className="js-heading">FOOTBALL LEAGUE</h1>
        <p className="js-subheading">Experimental team line-up and football field using CSS 3D transforms.</p>
        <div className="js-switcher switcher"> {/* Use className instead of class in JSX */}
          <a href="#" className="js-switch disabled switch-btn">HOME</a><a href="#" className="js-switch switch-btn">AWAY</a>
        </div>
      </div>
      <div className="js-stage stage texture"> {/* Use className instead of class in JSX */}
        <div className="js-world world"> {/* Use className instead of class in JSX */}
          <div className="team js-team">
            {/* Team cards / icons goes here */}
          </div>
          <div className="terrain js-terrain"> {/* Use className instead of class in JSX */}
            <div className="field field--alt"></div>
            <div className="field ground">
              <div className="field__texture field__texture--gradient"></div>
              <div className="field__texture field__texture--gradient-b"></div>
              <div className="field__texture field__texture--grass"></div>
              <div className="field__line field__line--goal"></div>
              <div className="field__line field__line--goal field__line--goal--far"></div>
              <div className="field__line field__line--outline"></div>
              <div className="field__line field__line--penalty"></div>
              <div className="field__line field__line--penalty-arc"></div>
              <div className="field__line field__line--penalty-arc field__line--penalty-arc--far"></div>
              <div className="field__line field__line--mid"></div>
              <div className="field__line field__line--circle"></div>
              <div className="field__line field__line--penalty field__line--penalty--far"></div>
            </div>
            <div className="field__side field__side--front"></div>
            <div className="field__side field__side--left"></div>
            <div className="field__side field__side--right"></div>
            <div className="field__side field__side--back"></div>
          </div>
        </div>
        <div className="loading js-loading">PLEASE WAIT...</div>
      </div>
    </>
  );
}
export default TestComponent