import { useState } from "react";
import "./App.css";
import GameLayout from "./components/GameLayout";
import StartPage from "./components/scenes/start-page.jsx";
import Scene1Book from "./components/scenes/scene-1-book.jsx";
import Scene2Door from "./components/scenes/scene-2-door.jsx";
import Scene3Couloir from "./components/scenes/scene-3-couloir.jsx";
import Scene6Classroom from "./components/scenes/scene-6-classroom.jsx";
import Loader from "./components/loader.jsx";

function App() {
  const [currentScene, setCurrentScene] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [targetScene, setTargetScene] = useState(null);

  console.log("currentScene:", currentScene);

  const navigateToScene = (sceneName, skipLoader = false) => {
    if (skipLoader) {
      setCurrentScene(sceneName);
    } else {
      setTargetScene(sceneName);
      setIsLoading(true);
    }
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
    setCurrentScene(targetScene);
    setTargetScene(null);
  };

  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }

  if (currentScene === "home") {
    return <StartPage onStart={() => navigateToScene("chapitre-1", true)} />;
  }

  if (currentScene === "chapitre-1") {
    return (
      <GameLayout onNavigate={navigateToScene}>
        <Scene1Book onNavigate={navigateToScene} />
      </GameLayout>
    );
  }

  if (currentScene === "portail") {
    return (
      <GameLayout onNavigate={navigateToScene}>
        <Scene2Door onNavigate={navigateToScene} />
      </GameLayout>
    );
  }

  if (currentScene === "couloir") {
    return (
      <GameLayout onNavigate={navigateToScene}>
        <Scene3Couloir onNavigate={navigateToScene} />
      </GameLayout>
    );
  }

  if (currentScene === "salle-classe") {
    return (
      <GameLayout onNavigate={navigateToScene}>
        <Scene6Classroom onNavigate={navigateToScene} />
      </GameLayout>
    );
  }

  return (
    <GameLayout onNavigate={navigateToScene}>
      <div className="flex items-center justify-center h-screen text-center">
        <div className="text-black text-3xl font-ff-providence-sans-web-pro">
          <p>Scène: {currentScene}</p>
          <p className="text-lg mt-4">Contenu à venir...</p>
        </div>
      </div>
    </GameLayout>
  );
}

export default App;
