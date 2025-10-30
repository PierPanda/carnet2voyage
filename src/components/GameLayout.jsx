// import BubbleMenu from "./BubbleMenu";
import { BookMenu } from "./BookMenu";
import { Icon } from "@iconify/react";
import { showInfoToast } from "../utils/toastUtils.jsx";
import Paper from "../assets/info-toast-bg.png";
import ClickSpark from "../components/sparkling-cursor.jsx";

export default function GameLayout({ children, onNavigate }) {
  // const menuItems = [
  //   {
  //     label: "Une école étrange",
  //     href: "#etrange-ecole",
  //     ariaLabel: "Chapitre 1 : Une école étrange",
  //     rotation: -8,
  //     hoverStyles: { bgColor: "#d97706", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Le portail",
  //     href: "#portail",
  //     ariaLabel: "Chapitre 1 : Le portail",
  //     rotation: 5,
  //     hoverStyles: { bgColor: "#0891b2", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Le couloir",
  //     href: "#couloir",
  //     ariaLabel: "Chapitre 1 : Le couloir",
  //     rotation: -5,
  //     hoverStyles: { bgColor: "#7c3aed", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Salle de classe",
  //     href: "#salle-classe",
  //     ariaLabel: "Chapitre 1 : Salle de classe",
  //     rotation: 8,
  //     hoverStyles: { bgColor: "#059669", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Tu m'attraperas pas",
  //     href: "#chapitre-2",
  //     ariaLabel: "Chapitre 2 : Tu m'attraperas pas",
  //     rotation: -5,
  //     hoverStyles: { bgColor: "#dc2626", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Le ventre vide",
  //     href: "#chapitre-3",
  //     ariaLabel: "Chapitre 3 : Le ventre vide",
  //     rotation: 5,
  //     hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  //   },
  //   {
  //     label: "Fin",
  //     href: "#fin",
  //     ariaLabel: "Fin",
  //     rotation: -8,
  //     hoverStyles: { bgColor: "#2563eb", textColor: "#ffffff" },
  //   },
  // ];

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={16}
      sparkRadius={24}
      sparkCount={8}
      duration={300}
      easing="ease-out"
      extraScale={1.2}
    >
      <div className="relative w-full h-screen">
        {/* <BubbleMenu
          logo={<Icon icon="mdi:compass" width="32" height="32" />}
          items={menuItems}
          menuAriaLabel="Menu de navigation"
          menuBg="#f59e0b"
          menuContentColor="#ffffff"
          backgroundImage={Paper}
        /> */}

        <BookMenu onNavigate={onNavigate} />

        <button
          className="fixed bottom-8 right-8 w-20 h-20 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 border-4 border-white hover:bg-white hover:text-gray-800 hover:scale-110"
          onClick={() => showInfoToast("Ceci est un toast personnalisé !")}
          aria-label="Afficher un toast"
        >
          <Icon icon="wpf:ask-question" width="38" height="38" />
        </button>

        <div className="w-full h-full">{children}</div>
      </div>
    </ClickSpark>
  );
}
