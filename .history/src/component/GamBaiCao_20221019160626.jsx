import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gameBaiCaoReducer, {
  drawCardApi,
  getNewDeckApi,
  resetCard,
  revealCard,
} from "../Redux/reducer/gameBaiCaoReducer";

export default function GamBaiCao(props) {
  const dispatch = useDispatch();

  const { newDeck, player, gambleScores } = useSelector(
    (state) => state.gameBaiCaoReducer
  );
  // console.log("deck", newDeck);
  // console.log("player", player);
  const listPlayer = player.filter((player) => player.status === true);

  const renderUser = () => {
    return player.map((item, index) => {
      if (
        item.show === false &&
        item.status === true &&
        item.cards.length != 0
      ) {
        return (
          <div className={"player " + item.name}>
            <div className="imgCards">
              <img src="./images/back-card.jpg" alt="" />
              <img src="./images/back-card.jpg" alt="" />
              <img src="./images/back-card.jpg" alt="" />
            </div>
            <h3 className="font-italic">Point: {item.point}</h3>
            <h3 className="font-weight-bolder">{item.name}</h3>
            <h3 className="font-italic">Point of 3 cards: </h3>
          </div>
        );
      } else {
        return (
          <div className={"player " + item.name}>
            <div className="imgCards">
              <img src={item.cards[0]?.image} alt="" />
              <img src={item.cards[1]?.image} alt="" />
              <img src={item.cards[2]?.image} alt="" />
            </div>
            <h3 className="font-italic">Point: {item.point}</h3>
            {item.point < gambleScores ? (
              <p className="text-danger mb-0">not enought point</p>
            ) : (
              ""
            )}
            <h3 className="font-weight-bolder">
              {item.name}{" "}
              {item.win === true ? (
                <span className="text-success">WIN</span>
              ) : (
                ""
              )}
            </h3>
            <h3 className="font-italic">Point of 3 cards:{item.total}</h3>
          </div>
        );
      }
    });
  };
  return (
    <div>
      {renderUser()}

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
              if (listPlayer.length * 3 <= newDeck.remaining) {
                dispatch(drawCardApi(newDeck.deck_id, listPlayer.length));
              } else {
                alert("Không đủ số lá bài để chơi, nhấn shuffle để chơi lại");
              }
            }}
          >
            Draw
          </button>
          <button
            className="revealBtn"
            onClick={() => {
              dispatch(revealCard());
            }}
          >
            Reveal
          </button>
          <button
            className="resetBtn"
            onClick={() => {
              dispatch(resetCard());
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
