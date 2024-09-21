import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { eventNames, getSocket } from "../../socket/socket";

function EnterGameId() {
  const [enterGameId, setEnterGameId] = useState("");

  return (
    <div className="EnterGameId w-full h-full flex flex-col items-center justify-center gap-[0.5rem]">
      <p>Enter Game Id:</p>
      <input
        className=" w-full h-[2.5rem] px-[0.5rem] text-primary-brown border-primary-brown border-[1px] rounded-[0.5rem]"
        placeholder="Enter game id ..."
        value={enterGameId}
        onChange={(e) => {
          setEnterGameId(e.target.value);
        }}
      />
      {enterGameId && (
        <div className="w-full flex justify-end items-center">
          <PrimaryButton
            className="bg-primary-green"
            onClick={() => {
              let socket = getSocket();

              socket.emit(
                eventNames.emit.confirmPlayerRequest,
                null,
                enterGameId
              );
            }}
          >
            Join game
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default EnterGameId;
