import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  drawCardApi,
  getNewDeckApi,
  resetCard,
  revealCard,
} from "../Redux/reducer/gameBaiCaoReducer";

export default function GamBaiCao(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewDeckApi());
  }, []);

  const { newDeck, player, gambleScores } = useSelector(
    (state) => state.gameBaiCaoReducer
  );

  const listPlayer = player.filter((player) => player.status === true);

  const renderUser = () => {
    return player.map((item, index) => {
      if (
        item.show === false &&
        item.status === true &&
        item.cards.length != 0
      ) {
        return (
          <div key={index} className={"player " + item.name}>
            <div className="imgCards">
              <img src="./images/back-card.jpg" alt="" />
              <img src="./images/back-card.jpg" alt="" />
              <img src="./images/back-card.jpg" alt="" />
            </div>
            <div className="playerContent">
              <div className="userPoint">
                <h3 className="font-italic">
                  Point: {item.point}
                  <br />
                  Gamble: {gambleScores}
                </h3>
              </div>
              <div className="userDetail">
                <h3 className="font-weight-bolder">{item.name}</h3>
                <h3 className="font-italic">Point of 3 cards: </h3>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className={"player " + item.name}>
            <div className="imgCards">
              <img src={item.cards[0]?.image} alt="" />
              <img src={item.cards[1]?.image} alt="" />
              <img src={item.cards[2]?.image} alt="" />
            </div>
            <div className="playerContent">
              <div className="userPoint">
                <h3 className="font-italic">
                  Point: {item.point}
                  <br />
                  Gamble: {gambleScores}
                  {item.point < gambleScores ? (
                    <span className="text-danger mb-0">
                      <br /> not enought
                    </span>
                  ) : (
                    ""
                  )}
                </h3>
              </div>
              <div className="userDetail">
                <h3 className="font-weight-bolder">
                  {item.name}{" "}
                  {item.win === false ? (
                    <span className="text-danger">Lose</span>
                  ) : item.win === true ? (
                    <span className="text-success">WIN</span>
                  ) : (
                    ""
                  )}
                </h3>
                <h3 className="font-italic">Point of 3 cards:{item.total}</h3>
              </div>
            </div>
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
                alert("Kh??ng ????? s??? l?? b??i ????? ch??i, nh???n shuffle ????? ch??i l???i");
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
              dispatch(getNewDeckApi());
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
