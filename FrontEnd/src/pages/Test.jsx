import React from "react";
import "./Test.css";
function Test() {
  return (
    <main>
      <div className="static">
        <h1 className="js-heading">FOOTBALL LEAGUE</h1>
        <p className="js-subheading">
          Experimental team line-up and football field using CSS 3D transforms.
        </p>
        <div className="js-switcher switcher">
          <a href="#" className="js-switch disabled switch-btn">
            HOME
          </a>
          <a href="#" className="js-switch switch-btn">
            AWAY
          </a>
        </div>
      </div>
      <div className="js-stage stage texture">
        <div className="js-world world">
          <div className="team js-team">
            {/* Team cards / icons goes here */}
          </div>
          <div className="terrain js-terrain">
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
    </main>
  );
}

export default Test;
