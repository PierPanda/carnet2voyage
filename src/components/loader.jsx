import { useEffect, useRef, useState } from "react";
import loaderVideo from "../assets/loader-nb.mp4";

export default function Loader({ onLoadComplete }) {
  const videoRef = useRef(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch((error) => {
        console.error("Erreur de lecture vidéo:", error);
      });

      const maxTimer = setTimeout(() => {
        setIsVideoEnded(true);
        setTimeout(() => {
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 300);
      }, 3000);

      const handleVideoEnd = () => {
        clearTimeout(maxTimer);
        setIsVideoEnded(true);
        setTimeout(() => {
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 300);
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
        clearTimeout(maxTimer);
      };
    }
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        isVideoEnded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="max-w-[80%] max-h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src={loaderVideo} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
    </div>
  );
}
