import { useState } from "react";
import rack from "../../assets/mini-games/porte-manteau/rack-nb.png";
import rackPiece from "../../assets/mini-games/porte-manteau/rack-piece-nb.png";
import rackDone from "../../assets/mini-games/porte-manteau/rack-color-done.png";

export default function Scene4RackMiniGame({ onNavigate }) {
  const [rotation, setRotation] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleRackClick = () => {
    if (!isComplete) {
      const newRotation = rotation + 15;
      setRotation(newRotation);

      if (newRotation >= 180) {
        setIsComplete(true);
        console.log("Mini-jeu terminé !");
      }
    }
  };

  const handleRetourCouloir = () => {
    if (onNavigate) {
      onNavigate("couloir");
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      {!isComplete ? (
        <>
          {/* Images avant complétion */}
          <img
            src={rack}
            alt="porte manteau"
            className="absolute inset-y-60 w-full h-full object-cover"
          />
          <img
            src={rackPiece}
            alt="pièce du rack"
            className="absolute -inset-y-35 w-full h-full object-cover cursor-pointer transition-transform duration-500"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={handleRackClick}
          />
        </>
      ) : (
        <>
          {/* Image finale après complétion */}
          <img
            src={rackDone}
            alt="rack complété"
            className="absolute inset-y-60 w-full h-full object-cover"
          />

          {/* Bouton retour au couloir */}
          <button
            onClick={handleRetourCouloir}
            className="absolute bottom-8 px-8 py-4 text-2xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
            style={{
              borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
            }}
          >
            Retour au couloir
          </button>
        </>
      )}
    </div>
  );
}
