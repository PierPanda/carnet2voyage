import couloirImage from "../../assets/scene-3/couloir-NB.png";

export default function Scene3Couloir({ onNavigate }) {
  const handlePorteClick = () => {
    if (onNavigate) {
      onNavigate("salle-classe");
    }
  };

  const handleCasierClick = () => {
    if (onNavigate) {
      onNavigate("locker-game");
    }
  };

  const handleRackClick = () => {
    if (onNavigate) {
      onNavigate("rack-game");
    }
  };

  return (
    <div className="fixed inset-0 bg-white">
      {/* Image du couloir */}
      <img
        src={couloirImage}
        alt="couloir"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Zone tout à gauche - Rack */}
      <div
        className="absolute inset-y-0 left-0 w-[18%] cursor-pointer"
        onClick={handleRackClick}
      ></div>

      {/* Zone centre-gauche - Porte */}
      <div
        className="absolute inset-y-0 left-[18%] w-[32%] cursor-pointer"
        onClick={handlePorteClick}
      ></div>

      {/* Zone droite - Casier */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
        onClick={handleCasierClick}
      ></div>
    </div>
  );
}
