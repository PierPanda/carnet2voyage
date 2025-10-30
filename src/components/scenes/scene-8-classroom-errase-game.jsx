import { useRef, useState, useEffect } from "react";
import tableVide from "../../assets/mini-games/gomme/table-vide.png";
import gribouillage from "../../assets/mini-games/gomme/gribouillage.png";
import eclair from "../../assets/mini-games/gomme/eclair.png";
import soleil from "../../assets/mini-games/gomme/soleil.png";
import jeu from "../../assets/mini-games/gomme/jeu.png";
import gribouillageVideo from "../../assets/mini-games/gomme/gribouillage.mp4";
import eclairVideo from "../../assets/mini-games/gomme/eclaire.mp4";
import soleilVideo from "../../assets/mini-games/gomme/soleil.mp4";
import jeuVideo from "../../assets/mini-games/gomme/jeu.mp4";

const DRAWINGS = [
  { name: "gribouillage", src: gribouillage },
  { name: "eclair", src: eclair },
  { name: "soleil", src: soleil },
  { name: "jeu", src: jeu },
];

export default function Scene8EraserGame({ onNavigate }) {
  const [erased, setErased] = useState([]);
  const [modal, setModal] = useState({ open: false, zone: null });
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleZoneClick = (zone) => {
    setModal({ open: true, zone });
  };

  const handleVideoEnd = () => {
    if (modal.zone) {
      setErased((prev) => [...prev, modal.zone.name]);
    }
    setModal({ open: false, zone: null });
  };

  const allErased = erased.length === DRAWINGS.length;

  const handleRetour = () => {
    if (onNavigate) onNavigate("salle-classe");
  };

  // Nouvelles zones calculées à partir des coins donnés (centre = milieu, r = moitié de la diagonale)
  const drawingZones = [
    {
      name: "gribouillage",
      x: (400 + 600) / 2, // 500
      y: (400 + 600) / 2, // 500
      r: Math.round(
        Math.sqrt(Math.pow(600 - 400, 2) + Math.pow(600 - 400, 2)) / 2
      ), // ~141
    },
    {
      name: "soleil",
      x: (910 + 1280) / 2, // 1095
      y: (46 + 230) / 2, // 138
      r: Math.round(
        Math.sqrt(Math.pow(1280 - 910, 2) + Math.pow(230 - 46, 2)) / 2
      ), // ~202
    },
    {
      name: "jeu",
      x: (1300 + 1750) / 2, // 1525
      y: (400 + 460) / 2, // 430
      r: Math.round(
        Math.sqrt(Math.pow(1750 - 1300, 2) + Math.pow(460 - 400, 2)) / 2
      ), // ~227
    },
    {
      name: "eclair",
      x: (730 + 1096) / 2, // 913
      y: (840 + 1013) / 2, // 926
      r: Math.round(
        Math.sqrt(Math.pow(1096 - 730, 2) + Math.pow(1013 - 840, 2)) / 2
      ), // ~202
    },
  ];

  function getVideoSrc(name) {
    switch (name) {
      case "gribouillage":
        return gribouillageVideo;
      case "eclair":
        return eclairVideo;
      case "soleil":
        return soleilVideo;
      case "jeu":
        return jeuVideo;
      default:
        return "";
    }
  }

  // Forcer le recalcul des zones après chargement de l'image
  const [svgZones, setSvgZones] = useState([]);
  // Pour debug : coordonnées souris
  const [mouseCoords, setMouseCoords] = useState(null);

  // Recalcule les zones à chaque resize et effacement
  useEffect(() => {
    function recalcZones() {
      if (!imageLoaded) return;
      const img = imageRef.current;
      if (!img) return;
      const imgRect = img.getBoundingClientRect();
      const displayWidth = imgRect.width;
      const displayHeight = imgRect.height;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const zones = drawingZones
        .filter((zone) => !erased.includes(zone.name))
        .map((zone) => {
          // Pas d'offset, car SVG est superposé à l'image
          const cx = zone.x * (displayWidth / naturalWidth);
          const cy = zone.y * (displayHeight / naturalHeight);
          const r = zone.r * (displayWidth / naturalWidth);
          return { ...zone, cx, cy, r };
        });
      setSvgZones(zones);
    }
    recalcZones();
    window.addEventListener("resize", recalcZones);
    return () => window.removeEventListener("resize", recalcZones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLoaded, erased]);

  return (
    <div
      className="fixed inset-0 bg-white select-none"
      style={{ userSelect: "none" }}
    >
      <div
        className="game-area relative w-full h-full max-w-[100vw] max-h-screen"
        style={{ touchAction: "none" }}
      >
        <img
          ref={imageRef}
          src={tableVide}
          alt="table-vide"
          className="absolute left-0 top-0 w-full h-full object-contain z-0"
          style={{ objectFit: "contain", width: "100vw", height: "100vh" }}
          onLoad={() => setImageLoaded(true)}
        />
        {DRAWINGS.map(
          (drawing) =>
            !erased.includes(drawing.name) && (
              <img
                key={drawing.name}
                src={drawing.src}
                alt={drawing.name}
                className="absolute left-0 top-0 w-full h-full object-contain z-10 pointer-events-none"
                style={{
                  objectFit: "contain",
                  width: "100vw",
                  height: "100vh",
                  opacity: 1 - erased.length * 0.1,
                }}
              />
            )
        )}
        {/* Zones cliquables */}
        <svg
          className="absolute left-0 top-0 w-full h-full z-50 pointer-events-auto"
          style={{ width: "100vw", height: "100vh" }}
          onMouseMove={(e) => {
            const img = imageRef.current;
            if (!img) return;
            const imgRect = img.getBoundingClientRect();
            const displayWidth = imgRect.width;
            const displayHeight = imgRect.height;
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const x = (e.nativeEvent.offsetX / displayWidth) * naturalWidth;
            const y = (e.nativeEvent.offsetY / displayHeight) * naturalHeight;
            setMouseCoords({ x: Math.round(x), y: Math.round(y) });
          }}
          onClick={function (e) {
            const img = imageRef.current;
            if (!img) return;
            const imgRect = img.getBoundingClientRect();
            const displayWidth = imgRect.width;
            const displayHeight = imgRect.height;
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const x = (e.nativeEvent.offsetX / displayWidth) * naturalWidth;
            const y = (e.nativeEvent.offsetY / displayHeight) * naturalHeight;
            // Affiche en console les coordonnées naturelles
            console.log(
              `Coordonnées image : x=${Math.round(x)}, y=${Math.round(y)}`
            );
          }}
          onMouseLeave={() => setMouseCoords(null)}
        >
          {svgZones.map((zone) => (
            <circle
              key={zone.name}
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r}
              fill="transparent"
              stroke="transparent"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onClick={() => handleZoneClick(zone)}
            />
          ))}
        </svg>
        {/* Affichage coordonnées souris pour debug placement zones */}
        {mouseCoords && (
          <div
            style={{
              position: "fixed",
              left: 10,
              bottom: 10,
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: 8,
              borderRadius: 8,
              zIndex: 200,
            }}
          >
            x: {mouseCoords.x} | y: {mouseCoords.y}
          </div>
        )}

        {/* Modale vidéo d'effacement */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100">
            <div
              className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center"
              style={{ minWidth: 700, minHeight: 500 }}
            >
              <video
                src={modal.zone && getVideoSrc(modal.zone.name)}
                autoPlay
                onEnded={handleVideoEnd}
                controls={false}
                style={{ maxWidth: 1000, maxHeight: 1000, borderRadius: 24 }}
              />
            </div>
          </div>
        )}

        {/* Message de fin */}
        {allErased && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
            <div>
              <div className="bg-white/90 rounded-2xl px-12 py-8 shadow-2xl border-4 border-yellow-400 mb-8">
                <p className="text-3xl font-ff-providence-sans-web-pro text-black mb-2">
                  Bravo ! Le bureau est tout propre.
                </p>
              </div>
              <button
                onClick={handleRetour}
                className="px-8 py-4 text-2xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
                style={{
                  borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                }}
              >
                Retour à la classe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
