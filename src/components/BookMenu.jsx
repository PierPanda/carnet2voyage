import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Book3D } from "./Book3D";
import paperBg from "../assets/menu/paper.png";

export function BookMenu({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sceneMap = {
    "#chapitre-1": "chapitre-1",
    "#portail": "portail",
    "#couloir": "couloir",
    "#salle-classe": "salle-classe",
    "#chapitre-2": "chapitre-2",
    "#chapitre-3": "chapitre-3",
    "#fin": "fin",
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

  return (
    <>
      <button
        className="fixed top-8 right-8 w-20 h-20 bg-amber-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 border-4 border-amber-900 hover:bg-amber-800 hover:scale-110"
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
            className="relative flex justify-center w-[90vw] h-[80vh] max-w-[1200px] animate-book-open"
            onClick={(e) => e.stopPropagation()}
            style={{ background: `url(${paperBg}) center/cover no-repeat` }}
          >
            <div className="w-1/2 h-full relative flex items-center justify-center">
              <nav className="flex flex-col gap-4 z-10 bg-yellow-50/90 border-2 border-yellow-200 rounded-2xl p-8 shadow-2xl max-w-[80%] max-h-[80%] overflow-y-auto ring-2 ring-yellow-100">
                {leftPageLinks.map((link, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`flex flex-col gap-1 text-amber-900 hover:text-amber-700 transition-all duration-300 hover:scale-105 group ${
                      link.indent ? "ml-8" : ""
                    } ${
                      link.isChapter
                        ? "bg-pink-100/80 rounded-xl px-4 py-2 shadow font-bold"
                        : "bg-white/80 rounded-lg px-3 py-1 shadow-sm"
                    }`}
                    style={{
                      borderLeft: link.isChapter
                        ? "6px solid #fbbf24"
                        : "3px dashed #fbbf24",
                      fontFamily: "ff-providence-sans-web-pro, sans-serif",
                      fontSize: link.isChapter ? "1.3rem" : "1rem",
                      marginLeft: link.indent ? 24 : 0,
                      boxShadow: link.isChapter
                        ? "2px 4px 12px 0 rgba(251,191,36,0.10)"
                        : "1px 2px 6px 0 rgba(251,191,36,0.08)",
                    }}
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigate && sceneMap[link.href]) {
                        onNavigate(sceneMap[link.href], true);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={link.icon}
                        width={link.isChapter ? "28" : "22"}
                        height={link.isChapter ? "28" : "22"}
                        className="opacity-80"
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
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
