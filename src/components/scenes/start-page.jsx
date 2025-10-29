export default function StartPage({ onStart }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white animate-fade-in">
      <div className="text-center space-y-12">
        <h1 className="text-7xl font-ff-providence-sans-web-pro font-bold text-black mb-8 animate-title-slide-down relative inline-block">
          Carnet de Voyage
        </h1>

        <p className="text-2xl text-black font-ff-providence-sans-web-pro italic animate-subtitle-fade-in">
          Une histoire étrange vous attend...
        </p>

        <button
          onClick={onStart}
          className="group relative px-16 py-8 text-3xl font-ff-providence-sans-web-pro font-bold text-black bg-white border-4 border-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white animate-button-pulse"
          style={{
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          }}
          aria-label="Commencer l'aventure"
        >
          Commencer l'aventure
        </button>

        <p className="text-sm text-gray-600 font-ff-providence-sans-web-pro animate-hint-fade-in">
          Cliquez pour débuter votre périple
        </p>
      </div>
    </div>
  );
}
