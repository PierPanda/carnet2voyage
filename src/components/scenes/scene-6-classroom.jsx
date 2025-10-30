import bureau from "../../assets/scene-6/bureau-sticker.png";
import tableau from "../../assets/scene-6/tableau-sticker.png";
import classroom from "../../assets/scene-6/classe-scene-nb.png";
import monster from "../../assets/scene-6/monster-sticker.png";

export default function Scene6Classroom({ onNavigate }) {
  const handleMaitresseClick = () => {
    alert("Zone Maîtresse cliquée");
    // Fonctionnalité maîtresse à ajouter plus tard
  };

  const handleTableauClick = () => {
    alert("Zone Tableau cliquée");
    // Navigation vers mini-jeu tableau à ajouter plus tard
  };

  const handleBureauClick = () => {
    alert("Zone Bureau cliquée");
    // Navigation vers mini-jeu bureau à ajouter plus tard
  };

  const handleMonstreClick = () => {
    alert("Zone Monstre cliquée");
    // Fonctionnalité monstre à ajouter plus tard
  };

  const handleHorlogeClick = () => {
    if (onNavigate) {
      onNavigate("classroom-clock-game");
    }
  };

  return (
    <div className="fixed inset-0 bg-white">
      {/* Images superposées en plein écran */}
      <img
        src={classroom}
        alt="classroom"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <img
        src={tableau}
        alt="tableau"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <img
        src={bureau}
        alt="bureau"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <img
        src={monster}
        alt="monstre"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Zones cliquables */}

      {/* Zone horloge - Milieu haut (60% × 20%) */}
      <div
        className="absolute top-0 left-[20%] w-[60%] h-[25%] cursor-pointer z-10"
        onClick={handleHorlogeClick}
      ></div>

      {/* Zone extrême gauche - Maîtresse (20% × 100%) */}
      <div
        className="absolute inset-y-0 left-0 w-[20%] cursor-pointer"
        onClick={handleMaitresseClick}
      ></div>

      {/* Zone milieu haut - Tableau (60% × 50%) */}
      <div
        className="absolute top-0 left-[20%] w-[60%] h-1/2 cursor-pointer"
        onClick={handleTableauClick}
      ></div>

      {/* Zone milieu bas - Bureau (60% × 50%) */}
      <div
        className="absolute bottom-0 left-[20%] w-[60%] h-1/2 cursor-pointer"
        onClick={handleBureauClick}
      ></div>

      {/* Zone extrême droite - Monstre (20% × 100%) */}
      <div
        className="absolute inset-y-0 right-0 w-[20%] cursor-pointer"
        onClick={handleMonstreClick}
      ></div>
    </div>
  );
}
