import React from "react";
import { ToastContainer, cssTransition } from "react-toastify";
// import infoToastBg from "../assets/info-toast-bg.png";
// import sketch1 from "../assets/sketch-yellow.png";
import sketch2 from "../assets/sketch-dark.png";

export function InfoToast({ message, closeToast }) {
  return (
    <div
      className="relative flex items-center min-w-[480px] min-h-40 rounded-2xl text-white text-4xl shadow-2xl px-16 py-12 will-change-transform"
      style={{
        background: `url(${sketch2}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <span className="font-ff-providence-sans-web-pro font-normal">
        {message}
      </span>
      <button
        type="button"
        className="absolute top-0 right-2 text-white text-4xl leading-none hover:text-gray-500 transition-colors w-20 h-20 scale-100 flex items-center justify-center cursor-pointer hover:scale-100"
        onClick={closeToast}
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
}

export function InfoToastContainer() {
  const Slide = cssTransition({
    enter: "animate-toast-slide-in",
    exit: "animate-toast-slide-out",
    duration: [500, 400],
  });

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar
      closeOnClick={false}
      pauseOnHover
      draggable
      closeButton={false}
      toastClassName={() => "bg-transparent shadow-none p-0"}
      bodyClassName={() => "p-0"}
      transition={Slide}
    />
  );
}
