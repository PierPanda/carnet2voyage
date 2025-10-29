import React from "react";
import { ToastContainer, cssTransition } from "react-toastify";
import infoToastBg from "../assets/info-toast-bg.png";

export function InfoToast({ message, closeToast }) {
  return (
    <div
      className="relative flex items-center min-w-[480px] min-h-40 rounded-2xl text-gray-800 text-4xl font-extrabold shadow-2xl px-16 py-12 will-change-transform"
      style={{
        background: `url(${infoToastBg}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      {message}
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-800 text-4xl leading-none hover:text-gray-500 transition-colors w-12 h-12 flex items-center justify-center cursor-pointer"
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
