import React, { useState } from "react";
import SecondaryButton from "../../components/SecondaryButton";
import { cards } from "../../components/cards/cards";
import SmallCard from "../../components/SmallCard";

function History({ game, setShowHistory }) {
  const { teams, currentRound } = game;
  const [showTeams, setShowTeams] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center gap-[1rem] relative ">
      <p className="text-[1.25rem] text-primary-brown">History</p>

      <div className="w-full flex gap-[1rem] items-center">
        {/* tabs */}
        <div
          className={` cursor-pointer ${
            showTeams
              ? " opacity-100 border-b-primary-brown border-b-2"
              : " opacity-50 border-b-2 border-b-transparent"
          }`}
          onClick={() => {
            setShowTeams(true);
          }}
        >
          Teams
        </div>
        <div
          className={`  cursor-pointer ${
            !showTeams
              ? " opacity-100 border-b-primary-brown border-b-2"
              : " opacity-50 border-b-2 border-b-transparent"
          }`}
          onClick={() => {
            setShowTeams(false);
          }}
        >
          Rounds history
        </div>
      </div>

      {showTeams && (
        <>
          {Object.keys(teams)
            ?.sort(
              // team with more health point shows up first
              (a, b) =>
                currentRound?.result?.teams?.[b]?.healthPoint -
                currentRound?.result?.teams?.[a]?.healthPoint
            )
            .map((tId) => (
              <div className="w-full flex justify-center items-center gap-[0.5rem] bg-third-brown rounded-[0.5rem] py-[1rem] border-b-2 border-b-primary-brown slide-in-right">
                <p>{teams[tId]?.name}</p>
                <p> - HP: {teams[tId]?.healthPoint}</p>
              </div>
            ))}
        </>
      )}

      <div className="w-full h-full flex flex-col gap-[0.5rem] overflow-auto">
        {!showTeams && (
          <>
            {game?.history?.map((h) => (
              <div key={h.index} className="w-full flex flex-col gap-[0.5rem]">
                <p
                  className="w-max mr-auto border-b-2 border-b-primary-brown"
                  key={h.index}
                >
                  Round {h?.index}
                </p>
                {Object.keys(teams)
                  ?.sort(
                    // team with more health point shows up first
                    (a, b) =>
                      h?.result?.teams?.[b]?.healthPoint -
                      h?.result?.teams?.[a]?.healthPoint
                  )
                  .map((id) => {
                    let team = teams[id];
                    return (
                      <div
                        className="w-full flex flex-col justify-center items-center gap-[0.75rem] bg-third-brown rounded-[0.5rem] py-[1rem] border-b-2 border-b-primary-brown"
                        key={h.index}
                      >
                        <p>
                          {team.name}{" "}
                          {h?.result?.teams?.[team.id] &&
                            `- HP: ${h?.result?.teams?.[team.id]?.healthPoint}`}
                        </p>

                        <div className="w-full flex flex-wrap gap-[0.25rem] items-center justify-center">
                          {h?.result?.activeActions?.map((action) => (
                            <ActiveAction
                              action={action}
                              team={team}
                              teams={teams}
                            />
                          ))}

                          {h?.result?.counteredActions?.map((action) => (
                            <CounteredAction
                              action={action}
                              team={team}
                              teams={teams}
                            />
                          ))}

                          {h?.result?.uselessActions?.map((action) => (
                            <UselessAction action={action} team={team} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="w-full flex mt-auto justify-end items-center">
        <SecondaryButton
          onClick={() => {
            setShowHistory(false);
          }}
        >
          Close
        </SecondaryButton>
      </div>
    </div>
  );
}

export const ActiveAction = ({ action, team, teams }) => {
  if (action.activator === team.id && action?.cards?.length > 0) {
    return (
      <>
        {action?.cards?.map((card) => {
          let actualCard = cards[card.type];
          return <SmallCard {...actualCard} imgSource={actualCard.img} />;
        })}
      </>
    );
  } else if (
    action.activator === team.id &&
    action?.actionName === "WinnerAttackAction"
  ) {
    return (
      <div className="w-max px-[0.5rem] rounded-md bg-white h-[3.75rem] flex justify-center items-center">
        <p>You attacked {action?.targets.map((tId) => teams[tId]?.name)}</p>
      </div>
    );
  } else {
    return null;
  }
};

export const CounteredAction = ({ action, team, teams }) => {
  if (action.activator === team.id && action?.cards?.length > 0) {
    return (
      <>
        {action?.cards?.map((card) => {
          let actualCard = cards[card.type];
          return (
            <SmallCard
              {...actualCard}
              imgSource={actualCard.img}
              isCovered
              coveredText={"Countered"}
            />
          );
        })}
      </>
    );
  } else if (
    action.activator === team.id &&
    action?.actionName === "WinnerAttackAction"
  ) {
    return (
      <div className="w-max px-[0.5rem] rounded-md bg-white h-[3.75rem] flex justify-center items-center">
        <p>
          Your attack against {action?.targets.map((tId) => teams[tId]?.name)}{" "}
          is countered
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export const UselessAction = ({ action, team }) => {
  if (action.activator === team.id && action?.cards?.length > 0) {
    return (
      <>
        {action?.cards?.map((card) => {
          let actualCard = cards[card.type];
          return (
            <SmallCard
              {...actualCard}
              imgSource={actualCard.img}
              isCovered
              coveredText={"Useless"}
            />
          );
        })}
      </>
    );
  } else {
    return null;
  }
};

export default History;
