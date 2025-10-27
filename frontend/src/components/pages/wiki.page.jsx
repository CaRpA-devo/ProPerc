import { useState } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Icon } from "@iconify/react";
import nutritionData from "../../data/nutritionData.json";

export function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCategories, setOpenCategories] = useState({});
  const [openNutrients, setOpenNutrients] = useState({});

  // Toggle Category
  const toggleCategory = (categoryKey) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  // Toggle Nutrient
  const toggleNutrient = (nutrientId) => {
    setOpenNutrients((prev) => ({
      ...prev,
      [nutrientId]: !prev[nutrientId],
    }));
  };

  // Filter & Search Logic
  const categories = Object.entries(nutritionData);
  const filteredCategories = categories.filter(([key]) => {
    if (activeFilter === "all") return true;
    return key === activeFilter;
  });

  // Flatten all items for search
  const getAllItems = () => {
    const items = [];
    categories.forEach(([categoryKey, category]) => {
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          subcategory.items.forEach((item) => {
            items.push({
              ...item,
              categoryKey,
              subcategoryName: subcategory.name,
            });
          });
        });
      } else if (category.items) {
        category.items.forEach((item) => {
          items.push({ ...item, categoryKey });
        });
      }
    });
    return items;
  };

  const searchResults = getAllItems().filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.function.toLowerCase().includes(searchLower) ||
      (item.sources && item.sources.toLowerCase().includes(searchLower))
    );
  });

  return (
    <DashboardLayout>
      <div className="relative min-h-[100svh] bg-base-200">
        <div className="absolute inset-0 bg-base-200/50 backdrop-blur-sm"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-primary mb-2">PercyPedia</h1>
            <p className="text-base-content/80 text-lg">
              Dein umfassendes Ernährungs-Lexikon für Vitamine, Mineralien,
              Proteine & Supplements
            </p>
          </div>

          {/* Search & Filter */}
          <div className="card bg-base-100 shadow-md rounded-2xl p-6 mb-8">
            <div className="mb-4">
              <div className="relative">
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-base-content opacity-50"
                />
                <input
                  type="text"
                  placeholder="Suche nach Nährstoffen, Funktionen oder Quellen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-12"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`btn btn-sm ${
                  activeFilter === "all" ? "btn-primary" : "btn-ghost"
                }`}
              >
                Alle
              </button>
              <button
                onClick={() => setActiveFilter("vitamine")}
                className={`btn btn-sm btn-ghost ${
                  activeFilter === "vitamine" ? "text-green-500" : ""
                }`}
              >
                <Icon icon="mdi:vitamin-outline" className="mr-1" />
                Vitamine
              </button>
              <button
                onClick={() => setActiveFilter("mineralien")}
                className={`btn btn-sm btn-ghost ${
                  activeFilter === "mineralien" ? "text-sky-500" : ""
                }`}
              >
                <Icon icon="mdi:atom" className="mr-1" />
                Mineralien
              </button>
              <button
                onClick={() => setActiveFilter("proteine")}
                className={`btn btn-sm btn-ghost ${
                  activeFilter === "proteine" ? "text-yellow-500" : ""
                }`}
              >
                <Icon icon="mdi:dna" className="mr-1" />
                Proteine
              </button>
              <button
                onClick={() => setActiveFilter("supplements")}
                className={`btn btn-sm btn-ghost ${
                  activeFilter === "supplements" ? "text-red-400" : ""
                }`}
              >
                <Icon icon="mdi:pill" className="mr-1" />
                Supplements
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {searchResults.length} Ergebnis
                {searchResults.length !== 1 ? "se" : ""} für "{searchTerm}"
              </h2>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="card bg-base-100/50 backdrop-blur-sm shadow-md rounded-2xl hover:shadow-xl transition-all"
                    >
                      <div
                        className="card-body cursor-pointer"
                        onClick={() => toggleNutrient(item.id)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="card-title">{item.name}</h3>
                          <Icon
                            icon="mdi:chevron-down"
                            className={`text-2xl transition-transform ${
                              openNutrients[item.id] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {openNutrients[item.id] && (
                          <div className="mt-4 space-y-2 border-t border-base-300 pt-4">
                            <div>
                              <h4 className="font-semibold text-primary mb-1">
                                Funktion
                              </h4>
                              <p className="text-base-content/80">
                                {item.function}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary mb-1">
                                {item.dailyNeed ? "Tagesbedarf" : "Dosierung"}
                              </h4>
                              <p className="text-base-content/80">
                                {item.dailyNeed || item.dosage}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary mb-1">
                                Quellen
                              </h4>
                              <p className="text-base-content/80">
                                {item.sources}
                              </p>
                            </div>
                            {item.special && (
                              <div>
                                <h4 className="font-semibold text-primary mb-1">
                                  Besonderheiten
                                </h4>
                                <p className="text-base-content/80">
                                  {item.special}
                                </p>
                              </div>
                            )}
                            {item.warning && (
                              <div className="alert alert-warning">
                                <Icon icon="mdi:alert" />
                                <span>{item.warning}</span>
                              </div>
                            )}
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-primary"
                              >
                                Mehr erfahren
                                <Icon
                                  icon="mdi:open-in-new"
                                  className="inline ml-1"
                                />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card bg-base-100 shadow-md rounded-2xl p-12 text-center">
                  <Icon
                    icon="mdi:search-off"
                    className="text-6xl mx-auto mb-4 opacity-50"
                  />
                  <p className="text-xl">Keine Ergebnisse gefunden</p>
                </div>
              )}
            </div>
          )}

          {/* Categories */}
          {!searchTerm && (
            <div className="space-y-6">
              {filteredCategories.map(([categoryKey, category]) => (
                <div
                  key={categoryKey}
                  className="card bg-base-100/50 backdrop-blur-sm shadow-md rounded-2xl hover:shadow-xl transition-all"
                >
                  <div
                    className="card-header cursor-pointer p-6"
                    onClick={() => toggleCategory(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Icon
                          icon={category.icon}
                          className={`text-3xl ${
                            categoryKey === "vitamine"
                              ? "text-green-500"
                              : categoryKey === "mineralien"
                              ? "text-sky-500"
                              : categoryKey === "proteine"
                              ? "text-yellow-500"
                              : categoryKey === "supplements"
                              ? "text-red-400"
                              : ""
                          }`}
                        />
                        <h2
                          className={`card-title text-2xl ${
                            categoryKey === "vitamine"
                              ? "text-green-500"
                              : categoryKey === "mineralien"
                              ? "text-sky-500"
                              : categoryKey === "proteine"
                              ? "text-yellow-500"
                              : categoryKey === "supplements"
                              ? "text-red-400"
                              : ""
                          }`}
                        >
                          {category.categoryName}
                        </h2>
                      </div>
                      <Icon
                        icon="mdi:chevron-down"
                        className={`text-3xl transition-transform ${
                          openCategories[categoryKey] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <p className="text-base-content/80 mt-2">
                      {category.description}
                    </p>
                  </div>

                  {openCategories[categoryKey] && (
                    <div className="card-body pt-0">
                      {/* Subcategories */}
                      {category.subcategories &&
                        category.subcategories.map((subcategory, subIndex) => (
                          <div key={subIndex} className="mb-6">
                            <h3
                              className={`text-xl font-semibold mb-2 ${
                                categoryKey === "vitamine"
                                  ? "text-green-500"
                                  : categoryKey === "mineralien"
                                  ? "text-sky-500"
                                  : categoryKey === "proteine"
                                  ? "text-yellow-500"
                                  : categoryKey === "supplements"
                                  ? "text-red-400"
                                  : "text-primary"
                              }`}
                            >
                              {subcategory.name}
                            </h3>
                            <p className="text-base-content/80 italic mb-4">
                              {subcategory.description}
                            </p>

                            <div className="space-y-4">
                              {subcategory.items.map((item) => (
                                <div
                                  key={item.id}
                                  className={`card bg-base-200/50 backdrop-blur-sm shadow-sm rounded-xl border-l-4 ${
                                    categoryKey === "vitamine"
                                      ? "border-green-500"
                                      : categoryKey === "mineralien"
                                      ? "border-sky-500"
                                      : categoryKey === "proteine"
                                      ? "border-yellow-500"
                                      : categoryKey === "supplements"
                                      ? "border-red-400"
                                      : "border-primary"
                                  }`}
                                >
                                  <div
                                    className="card-body cursor-pointer"
                                    onClick={() => toggleNutrient(item.id)}
                                  >
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-semibold">
                                        {item.name}
                                      </h4>
                                      <Icon
                                        icon="mdi:chevron-down"
                                        className={`text-xl transition-transform ${
                                          openNutrients[item.id]
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                    {openNutrients[item.id] && (
                                      <div className="mt-4 space-y-2 border-t border-base-300 pt-4">
                                        <div>
                                          <h5 className="font-semibold text-primary text-sm mb-1">
                                            Funktion
                                          </h5>
                                          <p className="text-sm text-base-content/80">
                                            {item.function}
                                          </p>
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-primary text-sm mb-1">
                                            {item.dailyNeed
                                              ? "Tagesbedarf"
                                              : "Dosierung"}
                                          </h5>
                                          <p className="text-sm text-base-content/80">
                                            {item.dailyNeed || item.dosage}
                                          </p>
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-primary text-sm mb-1">
                                            Quellen
                                          </h5>
                                          <p className="text-sm text-base-content/80">
                                            {item.sources}
                                          </p>
                                        </div>
                                        {item.special && (
                                          <div>
                                            <h5 className="font-semibold text-primary text-sm mb-1">
                                              Besonderheiten
                                            </h5>
                                            <p className="text-sm text-base-content/80">
                                              {item.special}
                                            </p>
                                          </div>
                                        )}
                                        {item.warning && (
                                          <div className="alert alert-warning">
                                            <Icon icon="mdi:alert" />
                                            <span className="text-sm">
                                              {item.warning}
                                            </span>
                                          </div>
                                        )}
                                        {item.link && (
                                          <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="link link-primary text-sm"
                                          >
                                            Mehr erfahren
                                            <Icon
                                              icon="mdi:open-in-new"
                                              className="inline ml-1"
                                            />
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                      {/* Direct Items */}
                      {category.items && (
                        <div className="space-y-4">
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              className={`card bg-base-200/50 backdrop-blur-sm shadow-sm rounded-xl border-l-4 ${
                                categoryKey === "vitamine"
                                  ? "border-green-500"
                                  : categoryKey === "mineralien"
                                  ? "border-sky-500"
                                  : categoryKey === "proteine"
                                  ? "border-yellow-500"
                                  : categoryKey === "supplements"
                                  ? "border-red-400"
                                  : "border-primary"
                              }`}
                            >
                              <div
                                className="card-body cursor-pointer"
                                onClick={() => toggleNutrient(item.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <Icon
                                    icon="mdi:chevron-down"
                                    className={`text-xl transition-transform ${
                                      openNutrients[item.id] ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                                {openNutrients[item.id] && (
                                  <div className="mt-4 space-y-2 border-t border-base-300 pt-4">
                                    <div>
                                      <h5 className="font-semibold text-primary text-sm mb-1">
                                        Funktion
                                      </h5>
                                      <p className="text-sm text-base-content/80">
                                        {item.function}
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-primary text-sm mb-1">
                                        {item.dailyNeed
                                          ? "Tagesbedarf"
                                          : "Dosierung"}
                                      </h5>
                                      <p className="text-sm text-base-content/80">
                                        {item.dailyNeed || item.dosage}
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-primary text-sm mb-1">
                                        Quellen
                                      </h5>
                                      <p className="text-sm text-base-content/80">
                                        {item.sources}
                                      </p>
                                    </div>
                                    {item.special && (
                                      <div>
                                        <h5 className="font-semibold text-primary text-sm mb-1">
                                          Besonderheiten
                                        </h5>
                                        <p className="text-sm text-base-content/80">
                                          {item.special}
                                        </p>
                                      </div>
                                    )}
                                    {item.warning && (
                                      <div className="alert alert-warning">
                                        <Icon icon="mdi:alert" />
                                        <span className="text-sm">
                                          {item.warning}
                                        </span>
                                      </div>
                                    )}
                                    {item.link && (
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link link-primary text-sm"
                                      >
                                        Mehr erfahren
                                        <Icon
                                          icon="mdi:open-in-new"
                                          className="inline ml-1"
                                        />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
