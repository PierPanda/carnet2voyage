import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Book3D } from "./Book3D";

export function BookMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const leftPageLinks = [
    {
      label: "Chapitre 1 : Une école étrange",
      href: "#chapitre-1",
      icon: "mdi:book-open-page-variant",
      isChapter: true,
    },
    {
      label: "Le portail",
      href: "#portail",
      icon: "mdi:gate",
      subtitle:
        "j'ai pas peur des portails, mais celui de l'école c'est différent…",
      indent: true,
    },
    {
      label: "Le couloir",
      href: "#couloir",
      icon: "mdi:hospital-building",
      subtitle: "je devrais pas rester ici trop longtemps",
      indent: true,
    },
    {
      label: "Salle de classe",
      href: "#salle-classe",
      icon: "mdi:desk",
      subtitle: "je vais juste me mettre à mon bureau",
      indent: true,
    },
    {
      label: "Chapitre 2 : Tu m'attraperas pas",
      href: "#chapitre-2",
      icon: "mdi:run",
      isChapter: true,
    },
    {
      label: "Chapitre 3 : Le ventre vide",
      href: "#chapitre-3",
      icon: "mdi:food-apple",
      isChapter: true,
    },
    {
      label: "Fin",
      href: "#fin",
      icon: "mdi:book-check",
      isChapter: true,
    },
  ];

  const rightPageStickers = [
    { icon: "mdi:star", color: "#fbbf24" },
    { icon: "mdi:heart", color: "#ef4444" },
    { icon: "mdi:pencil", color: "#3b82f6" },
    { icon: "mdi:lightbulb", color: "#f59e0b" },
  ];

  return (
    <>
      <button
        className="fixed top-8 left-8 w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 border-4 border-amber-900 hover:bg-amber-800 hover:scale-110"
        onClick={toggleMenu}
        aria-label="Ouvrir le menu"
      >
        <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} width="32" height="32" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={toggleMenu}
        >
          <div
            className="relative w-[90vw] h-[80vh] max-w-[1200px] animate-book-open"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0">
              <Book3D />
            </div>

            <div className="absolute inset-0 flex">
              {/* Page gauche */}
              <div className="w-1/2 p-12 flex flex-col justify-center overflow-y-auto">
                <nav className="flex flex-col gap-3">
                  {leftPageLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`flex flex-col gap-1 text-amber-900 hover:text-amber-700 transition-all duration-300 hover:translate-x-2 hover:scale-105 group ${
                        link.indent ? "ml-8" : ""
                      }`}
                      onClick={toggleMenu}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          icon={link.icon}
                          width={link.isChapter ? "28" : "24"}
                          height={link.isChapter ? "28" : "24"}
                          className="group-hover:scale-110 transition-transform"
                        />
                        <span
                          className={`font-ff-providence-sans-web-pro ${
                            link.isChapter ? "text-2xl font-bold" : "text-lg"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      {link.subtitle && (
                        <span className="text-sm italic text-amber-800 ml-9 opacity-80">
                          {link.subtitle}
                        </span>
                      )}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Page droite */}
              <div className="w-1/2 p-12 flex flex-wrap  items-center justify-center gap-8 content-center">
                {rightPageStickers.map((sticker, index) => (
                  <div
                    key={index}
                    className="animate-bounce hover:scale-125 transition-transform duration-300"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  >
                    <Icon
                      icon={sticker.icon}
                      width="64"
                      height="64"
                      style={{ color: sticker.color }}
                    />
                  </div>
                ))}
                <p className="text-amber-900 font-ff-providence-sans-web-pro text-lg italic mt-4 text-center w-full">
                  Dessins et stickers à venir...
                </p>
              </div>
            </div>

            <button
              className="absolute -top-4 -right-4 w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-800 transition-colors z-10"
              onClick={toggleMenu}
              aria-label="Fermer le menu"
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
