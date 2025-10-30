import { useState } from "react";
import tableauNB from "../../assets/mini-games/tableau/tableau-nb.png";
import image2 from "../../assets/mini-games/tableau/2.png";
import image4 from "../../assets/mini-games/tableau/4.png";
import image5 from "../../assets/mini-games/tableau/5.png";
import sketch2 from "../../assets/sketch-dark.png";

export default function Scene9BlackboardGame({ onNavigate, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage5, setShowImage5] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    { question: "1 + 1", answer: "2" },
    { question: "3 + 2", answer: "5" },
    { question: "4 + 0", answer: "4" },
  ];

  const handleSubmit = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setErrorMessage("");
      setUserAnswer("");
      return;
    }

    const currentQuestion = questions[currentStep - 1];
    if (userAnswer === currentQuestion.answer) {
      // Bonne réponse
      setErrorMessage("");
      setUserAnswer("");

      if (currentStep === 1) {
        setShowImage2(true);
        setCurrentStep(2);
      } else if (currentStep === 2) {
        setShowImage5(true);
        setCurrentStep(3);
      } else if (currentStep === 3) {
        setShowImage4(true);
        setCurrentStep(4);
        setShowToast(false);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    } else {
      // Mauvaise réponse
      setErrorMessage("Ce n'est pas la bonne réponse. Réessaye !");
      setUserAnswer("");
    }
  };

  const getToastContent = () => {
    if (currentStep === 0) {
      return {
        title: "Règles du jeu",
        text: "Résous les 3 calculs pour compléter le tableau. Bonne chance !",
        showInput: false,
      };
    } else if (currentStep <= 3) {
      const question = questions[currentStep - 1];
      return {
        title: `Calcul ${currentStep}`,
        text: errorMessage || `Combien font ${question.question} ?`,
        showInput: true,
      };
    }
    return null;
  };

  const toastContent = getToastContent();

  const handleRetourClasse = () => {
    if (onNavigate) {
      onNavigate("salle-classe");
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <img
        src={tableauNB}
        alt="tableau"
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Layers d'images */}
      {showImage2 && (
        <img
          src={image2}
          alt="2"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {showImage5 && (
        <img
          src={image5}
          alt="5"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {showImage4 && (
        <img
          src={image4}
          alt="4"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {/* Toast */}
      {showToast && toastContent && (
        <div className="fixed bottom-8 right-8 z-50">
          <div
            className="relative flex flex-col min-w-[480px] min-h-40 rounded-2xl text-white text-2xl shadow-2xl px-16 py-12"
            style={{
              background: `url(${sketch2}) no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            <h3 className="font-ff-providence-sans-web-pro font-bold text-3xl mb-4">
              {toastContent.title}
            </h3>
            <p className="font-ff-providence-sans-web-pro font-normal mb-4">
              {toastContent.text}
            </p>

            {toastContent.showInput && (
              <div className="flex gap-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg text-black text-xl"
                  placeholder="Ta réponse"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Valider
                </button>
              </div>
            )}

            {!toastContent.showInput && (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors self-end"
              >
                Commencer
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bouton retour à la classe */}
      {isComplete && (
        <button
          onClick={handleRetourClasse}
          className="absolute bottom-8 px-8 py-4 text-2xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
          style={{
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          }}
        >
          Retour à la classe
        </button>
      )}
    </div>
  );
}
