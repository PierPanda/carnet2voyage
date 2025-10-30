import { useState, useRef } from "react";
import horlogeVidéo from "../../assets/mini-games/horloge/HORLOGE.mp4";
import horlogeColor from "../../assets/mini-games/horloge/horloge-couleur.png";

export default function Scene7ClassroomClockGame({ onNavigate }) {
  const [isStarted, setIsStarted] = useState(false);
  const [showColorImage, setShowColorImage] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  const handleButtonClick = () => {
    setIsStarted(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    console.log("Vidéo terminée");
    setShowColorImage(true);
    setIsDone(true);
  };

  const handleRetourClasse = () => {
    if (onNavigate) {
      onNavigate("salle-classe");
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      {/* Vidéo de l'horloge (affichée dès le début en pause) */}
      {!showColorImage && (
        <video
          ref={videoRef}
          src={horlogeVidéo}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onEnded={handleVideoEnd}
        />
      )}

      {/* Image de l'horloge en couleur (après complétion) */}
      {showColorImage && (
        <img
          src={horlogeColor}
          alt="horloge en couleur"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* Bouton pour mettre l'horloge à l'heure */}
      {!isStarted && (
        <button
          onClick={handleButtonClick}
          className="absolute bottom-8 px-8 py-4 text-2xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
          style={{
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          }}
        >
          Mettre l'horloge à l'heure
        </button>
      )}

      {/* Bouton retour à la classe */}
      {isDone && (
        <button
          onClick={handleRetourClasse}
          className="absolute bottom-8 px-8 py-4 text-2xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
          style={{
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          }}
        >
          Retour à la classe
        </button>
      )}
    </div>
  );
}
