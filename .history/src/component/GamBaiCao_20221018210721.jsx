import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gameBaiCaoReducer, {
  drawCardApi,
  getNewDeckApi,
} from "../Redux/reducer/gameBaiCaoReducer";

export default function GamBaiCao(props) {
  const dispatch = useDispatch();

  const { newDeck, player } = useSelector((state) => state.gameBaiCaoReducer);
  console.log("deck", newDeck);
  console.log("player", player);

  useEffect(() => {
    // dispatch(getNewDeckApi());
  }, []);

  const renderUser = (userName) => {
    return player.map((item, index) => {
      return `<div className="player ${item.name}">
      <div className="imgCards">
        <img src=${item.cards[0].image} alt="" />
        <img src=${item.cards[1].image} alt="" />
        <img src=${item.cards[2].image} alt="" />
      </div>
      <h3 className="font-italic">Point: 5000</h3>
      <h3 className="font-weight-bolder">${item.name}</h3>
      <h3 className="font-italic">Point of 3 cards: ${item.cards.reduce(
        (total, card, index) => {
          total + cards.values;
        },
        0
      )}</h3>
    </div>`;
    });
  };
  return (
    <div>
      <div className="player userA">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" alt="" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserA</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userB">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" alt="" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserB</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userC">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" alt="" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserC</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="player userD">
        <div className="imgCards">
          <img src="https://deckofcardsapi.com/static/img/8C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/9C.png" alt="" />
          <img src="https://deckofcardsapi.com/static/img/0C.png" alt="" />
        </div>
        <h3 className="font-italic">Point: 5000</h3>
        <h3 className="font-weight-bolder">UserD</h3>
        <h3 className="font-italic">Point of 3 cards: 22</h3>
      </div>
      <div className="controllTable">
        <h1 className="deskCards">Desk Cards {newDeck.remaining}</h1>
        <div className="controllButton">
          <button
            className="shuffleBtn"
            onClick={() => {
              dispatch(getNewDeckApi());
            }}
          >
            Shuffler
          </button>
          <button
            className="drawBtn"
            onClick={() => {
              dispatch(drawCardApi(newDeck.deck_id));
            }}
          >
            Draw
          </button>
          <button
            className="revealBtn"
            onClick={() => {
              console.log("revealBtn");
            }}
          >
            Reveal
          </button>
          <button
            className="resetBtn"
            onClick={() => {
              console.log("resetBtn");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
