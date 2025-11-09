import React from "react";
import { useNavigate } from "react-router-dom";

const AdvancedFoodModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleApiSearch = () => {
    navigate("/add-food-api");
    onClose();
  };

  const handleLocalDatabase = () => {
    navigate("/add-food-local");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 z-50 p-4 pt-6">
      <div className="bg-base-100 border border-green-800/30 rounded-lg p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">🍽️ Essen hinzufügen</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl bg-red-500/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-500/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        <p className="text-white/80 mb-6 text-center">
          Wähle eine Methode zum Hinzufügen von Essen
        </p>

        <div className="space-y-4">
          <button
            onClick={handleApiSearch}
            className="w-full p-6 bg-green-500/20 backdrop-blur-sm border border-green-500/30 hover:bg-green-500/30 rounded-lg text-left transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-green-400 mb-2">
                  🔍 API-Suche
                </h4>
                <p className="text-white/80 text-sm">
                  Intelligente Suche mit Allergien- und
                  Ernährungsweise-Filterung
                </p>
              </div>
              <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </button>

          <button
            onClick={handleLocalDatabase}
            className="w-full p-6 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 hover:bg-blue-500/30 rounded-lg text-left transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-2">
                  💾 Lokale Datenbank
                </h4>
                <p className="text-white/80 text-sm">
                  Schnellauswahl aus vorinstallierten Nahrungsmitteln
                </p>
              </div>
              <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFoodModal;
