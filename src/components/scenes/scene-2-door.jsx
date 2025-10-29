import { useState } from "react";
import element1 from "../../assets/scene-2/close/cloture.png";
import element2 from "../../assets/scene-2/close/poteaux.png";
import element3 from "../../assets/scene-2/close/portail-ferme.png";
import element4 from "../../assets/scene-2/close/verrou-ferme.png";
import element5 from "../../assets/scene-2/open/open-door.png";
import element6 from "../../assets/scene-2/open/portaill_ouvert.png";
import portailSound from "../../assets/sounds/PORTAIL.mp3";

export default function Scene2Door({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const closeContent = [
    { src: element1, alt: "cloture", clickable: false },
    { src: element2, alt: "poteaux", clickable: false },
    { src: element3, alt: "portail-ferme", clickable: false },
    { src: element4, alt: "verrou-ferme", clickable: true },
  ];

  const openContent = [
    { src: element1, alt: "cloture", clickable: false },
    { src: element2, alt: "poteaux", clickable: false },
    { src: element5, alt: "open-door", clickable: false },
    { src: element6, alt: "portaill-ouvert", clickable: false },
  ];

  const handleElement4Click = () => {
    if (!isTransitioning) {
      const audio = new Audio(portailSound);
      audio.play().catch((error) => {
        console.error("Erreur de lecture audio:", error);
      });

      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 3000);

      setIsTransitioning(true);
      setTimeout(() => {
        setIsOpen(true);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleOpenContentClick = () => {
    if (isOpen && onNavigate) {
      onNavigate("couloir");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {closeContent.map((element, index) => (
          <img
            key={`close-${index}`}
            src={element.src}
            alt={element.alt}
            className={`absolute inset-0 w-full h-full object-contain ${
              element.clickable ? "cursor-pointer z-10 animate-pulse-hint" : ""
            }`}
            onClick={element.clickable ? handleElement4Click : undefined}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isOpen ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOpenContentClick}
      >
        {openContent.map((element, index) => (
          <img
            key={`open-${index}`}
            src={element.src}
            alt={element.alt}
            className="absolute inset-0 w-full h-full object-contain"
          />
        ))}
      </div>
    </div>
  );
}
