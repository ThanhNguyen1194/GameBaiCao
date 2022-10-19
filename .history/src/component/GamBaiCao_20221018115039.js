import React from "react";
export default function GamBaiCao() {
  return <div>
    <div className="player">
      <div className="imgCards">
        <img src="https://deckofcardsapi.com/static/img/8C.png" />
        <img src="https://deckofcardsapi.com/static/img/9C.png" />
        <img src="https://deckofcardsapi.com/static/img/0C.png" />
      </div>
      <h3>Point: 5000</h3>
      <h3 className="font-weight-bolder">UserA</h3>
      <h3>Point of 3 cards: 22</h3>
    </div>
    <div className="controllTable">
      <h1 className="deskCards">Desk Cards 40</h1>
      <div className="controllButton">
        <button className="shuffleBtn">Shuffler</button>
        <button className="drawBtn">Draw</button>
        <button className="revealBtn">Reveal</button>
        <button className="resetBtn">Reset</button>
      </div>
    </div>

  </div>

}
