import { useState } from "react";
import zoomCasierEmpty from "../../assets/mini-games/casier/zoom-casier-vide.png";
import zoomeCasierDone from "../../assets/mini-games/casier/zoom-casier-couleur.png";
import calcul from "../../assets/mini-games/casier/calcul.png";
import geometrie from "../../assets/mini-games/casier/géométrie.png";
import grammaire from "../../assets/mini-games/casier/grammaire.png";

export default function Scene5LockerGame({ onNavigate }) {
  const [visibleBooks, setVisibleBooks] = useState({
    calcul: true,
    geometrie: true,
    grammaire: true,
  });

  const allBooksRemoved =
    !visibleBooks.calcul && !visibleBooks.geometrie && !visibleBooks.grammaire;

  const handleBookClick = (bookName) => {
    setVisibleBooks((prev) => ({
      ...prev,
      [bookName]: false,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <img
        src={allBooksRemoved ? zoomeCasierDone : zoomCasierEmpty}
        alt="zoom casier"
        className={`absolute top-1/2 ${allBooksRemoved ? 'left-1/2' : 'left-370'} -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500`}
      />
      <img
        src={calcul}
        alt="Livre de calcul"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
          visibleBooks.calcul ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={geometrie}
        alt="Livre de géométrie"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
          visibleBooks.geometrie ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={grammaire}
        alt="Livre de grammaire"
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
          visibleBooks.grammaire ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className="absolute inset-y-0 left-[35%] w-[10%] cursor-pointer"
        onClick={() => handleBookClick("calcul")}
      />
      <div
        className="absolute inset-y-0 left-[45%] w-[10%] cursor-pointer"
        onClick={() => handleBookClick("geometrie")}
      />
      <div
        className="absolute inset-y-0 left-[55%] w-[10%] cursor-pointer"
        onClick={() => handleBookClick("grammaire")}
      />
    </div>
  );
}
