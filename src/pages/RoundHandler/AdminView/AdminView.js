import React, { useState } from "react";
import SmallCard from "../../../components/SmallCard";

function AdminView({ game }) {
  const { teams, currentRound, cards } = game;
  const [dataId, setDataId] = useState("");
  return (
    <div className="w-full h-full flex flex-col gap-[1rem] relative overflow-auto">
      <p className="w-full text-center text-[1.5rem]">Admin View</p>
      <div className="w-full h-full flex flex-col gap-[1rem] relative ">
        <p>Current Round:</p>
        {cards && (
          <>
            {/* Teams' Cards */}
            <div className="w-full flex flex-col bg-white bg-opacity-50 rounded-md px-[0.5rem] py-[1rem]">
              <p>Team Cards</p>
              {cards.teamCardInfo &&
                Object.keys(cards.teamCardInfo).map((teamId) => (
                  <div className="w-full flex flex-col rounded-md px-[0.5rem] py-[1rem]">
                    <p>{teams[teamId].name}</p>
                    <div className="w-full flex flex-col rounded-md px-[0.5rem] py-[1rem]">
                      <p>Active Cards</p>
                      <div className="w-full flex flex-wrap justify-center gap-[0.5rem]">
                        {cards.teamCardInfo[teamId].activeCards &&
                        cards.teamCardInfo[teamId].activeCards.length > 0 ? (
                          cards.teamCardInfo[teamId].activeCards.map((c) => (
                            <SmallCard type={c.type} text={c.description} />
                          ))
                        ) : (
                          <span>None</span>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col rounded-md px-[0.5rem] py-[1rem]">
                      <p>Used Cards</p>
                      <div className="w-full flex flex-wrap justify-center gap-[0.5rem]">
                        {cards.teamCardInfo[teamId].usedCards &&
                        cards.teamCardInfo[teamId].usedCards.length > 0 ? (
                          cards.teamCardInfo[teamId].usedCards.map((c) => (
                            <SmallCard type={c.type} text={c.description} />
                          ))
                        ) : (
                          <span>None</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Riddle */}
            {game?.currentRound?.riddle && (
              <div className="w-full bg-white bg-opacity-80 px-[0.5rem] py-[1rem] rounded-md">
                <p>Riddle</p>
                <pre className=" text-wrap">
                  {JSON.stringify(game?.currentRound?.riddle, null, 2)}
                </pre>
              </div>
            )}

            {/* Remaining Cards */}
            <div className="w-full flex flex-col bg-white bg-opacity-50 rounded-md px-[0.5rem] py-[1rem]">
              <p>Remaining Cards</p>
              <div className="w-full flex flex-wrap justify-center gap-[0.5rem]">
                {cards.remainingCards &&
                  cards.remainingCards.map((c) => (
                    <SmallCard type={c.type} text={c.description} />
                  ))}
              </div>
            </div>

            <div className="w-full flex flex-col">
              <p>Data</p>
              <div className="Tabs w-full flex items-center justify-between flex-wrap">
                {Object.keys(game).map((tabId) => (
                  <div
                    className="Tab w-max px-[1rem] py-[0.25rem] bg-primary-blue text-white rounded-md cursor-pointer"
                    key={tabId}
                    onClick={() => {
                      setDataId(tabId);
                    }}
                  >
                    <p>{tabId}</p>
                  </div>
                ))}
              </div>
              {dataId ? (
                <div>
                  {typeof game[dataId] === "string" && <p>{game[dataId]}</p>}
                  {typeof game[dataId] !== "string" &&
                    Object.keys(game[dataId]).map((key) => {
                      console.log(typeof game[dataId][key]);
                      return (
                        <details>
                          <summary>{key}</summary>
                          {typeof game[dataId][key] === "string" ? (
                            <p>{game[dataId][key]}</p>
                          ) : (
                            <pre className=" text-wrap">
                              {JSON.stringify(game[dataId][key], null, 2)}
                            </pre>
                          )}
                        </details>
                      );
                    })}
                </div>
              ) : (
                <p>Pick a data type to be shown</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminView;
