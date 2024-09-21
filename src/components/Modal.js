import React from "react";

function Modal({ children, show, setShow }) {
  return (
    <>
      {show && (
        <div className="Modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className="w-full h-full absolute top-0 left-0 z-0"
            onClick={() => {
              setShow(false);
            }}
          ></div>

          <div className="Modal-body bg-secondary-brown w-[80%] h-[80%] rounded-[0.75rem] p-[0.75rem] z-10 relative overflow-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
