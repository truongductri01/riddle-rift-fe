import React from "react";

function AdminRiddle({ riddle }) {
  return (
    <div className="AdminRiddle w-full flex flex-col justify-center items-start gap-[1rem]">
      <p>{riddle?.preQuestion}</p>
      <p className="w-full text-center text-[1.25rem] font-semibold">
        {riddle?.question}
      </p>
    </div>
  );
}

export default AdminRiddle;
