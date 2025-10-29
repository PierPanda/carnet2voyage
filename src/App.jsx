import "./App.css";
import { InfoToastContainer } from "./components/InfoToast";
import { showInfoToast } from "./utils/toastUtils.jsx";
import { Icon } from "@iconify/react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-3xl font-bold gap-6">
      home
      <button
        className="fixed bottom-8 right-8 w-20 h-20 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-100 z-50 border-4 border-white"
        onClick={() => showInfoToast("Ceci est un toast personnalisé !")}
        aria-label="Afficher un toast"
      >
        <Icon icon="wpf:ask-question" width="38" height="38" />
      </button>
      <InfoToastContainer />
    </div>
  );
}

export default App;
