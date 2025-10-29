import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";

export default function BubbleMenu({
  items = [],
  menuAriaLabel = "Toggle navigation",
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
  backgroundImage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItemsRef = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: animationDuration,
          ease: animationEase,
          stagger: staggerDelay,
        }
      );
    }
  }, [isOpen, animationDuration, animationEase, staggerDelay]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="fixed top-8 right-8 w-20 h-20 rounded-full flex items-center bg-transparent border-white font-white justify-center shadow-2xl transition-all duration-300 z-50 border-4 hover:scale-110 hover:bg-white hover:text-gray-800"
        style={{}}
        onClick={toggleMenu}
        aria-label={menuAriaLabel}
      >
        {isOpen ? (
          <Icon icon="majesticons:close-line" width="32" height="32" />
        ) : (
          <Icon icon="majesticons:menu-line" width="32" height="32" />
        )}
      </button>

      {/* Overlay du menu */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        >
          {/* Conteneur des bulles */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, index) => (
              <a
                key={index}
                ref={(el) => (menuItemsRef.current[index] = el)}
                href={item.href}
                aria-label={item.ariaLabel}
                className="relative group"
                style={{
                  transform: `rotate(${item.rotation || 0}deg)`,
                }}
                onClick={toggleMenu}
              >
                <div
                  className="w-[500px] h-[400px] p-12 flex items-center justify-center text-6xl font-ff-providence-sans-web-pro font-bold transition-all duration-300 group-hover:scale-110 relative"
                  style={{
                    backgroundImage: backgroundImage
                      ? `url(${backgroundImage})`
                      : "none",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    color: "#111111",
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
