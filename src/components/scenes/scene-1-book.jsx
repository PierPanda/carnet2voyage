import { useEffect, useRef, useState } from "react";
import openingBookVideo from "../../assets/scene-1/opening-book-white.mp4";
import Loader from "../loader";

export default function Scene1Book({ onNavigate }) {
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderOpacity, setLoaderOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch((error) => {
        console.error("Erreur de lecture vidéo:", error);
      });

      const handleTimeUpdate = () => {
        const timeRemaining = video.duration - video.currentTime;

        if (timeRemaining <= 1 && timeRemaining > 0 && !isFadingOut) {
          setIsFadingOut(true);
          setShowLoader(true);

          setTimeout(() => {
            setLoaderOpacity(1);
          }, 100);
        }
      };

      const handleVideoEnd = () => {};

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [onNavigate, isFadingOut]);

  const handleLoaderComplete = () => {
    if (onNavigate) {
      onNavigate("portail", true);
    }
  };

  return (
    <div className="fixed inset-0 bg-white">
      <div
        className="fixed inset-0 bg-black transition-opacity duration-1000"
        style={{ opacity: isFadingOut ? 0 : 1 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src={openingBookVideo} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      {showLoader && (
        <div
          className="fixed inset-0 transition-opacity duration-1000"
          style={{ opacity: loaderOpacity }}
        >
          <Loader onLoadComplete={handleLoaderComplete} />
        </div>
      )}
    </div>
  );
}
