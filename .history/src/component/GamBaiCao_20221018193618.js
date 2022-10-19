import React from "react";
import { useDispatch } from 'react-redux'
// import { getNewDeckApi } from "../Redux/reducer/gameBaiCaoReducer";

export default function GamBaiCao() {
  // const dispatch = useDispatch();
  const dispatch = useDispatch()
  return (
    <div>
      <div className="player userA">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserA</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userB">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserB</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userC">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserC</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userD">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserD</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="controllTable">
        <h1 className="deskCards">Desk Cards 40</h1>
        <div className="controllButton">
          <button className="shuffleBtn" onClick={() => {
            // dispatch(getNewDeckApi())
          }}>Shuffler</button>
          <button className="drawBtn" onClick={() => { console.log("drawBtn") }}>Draw</button>
          <button className="revealBtn" onClick={() => { console.log("revealBtn") }}>Reveal</button>
          <button className="resetBtn" onClick={() => { console.log("resetBtn") }}>Reset</button>
        </div>
      </div>

    </div>
  )

}
