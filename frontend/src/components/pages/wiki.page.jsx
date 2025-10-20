import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { Icon } from "@iconify/react";
import nutritionData from "../../data/nutritionData.json";
import "./wiki.style.css";

export function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [openCategories, setOpenCategories] = useState({});
  const [openNutrients, setOpenNutrients] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to Top Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            items.push({ ...item, categoryKey, subcategoryName: subcategory.name });
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
      <div className="wiki-container">
        {/* Header */}
        <div className="wiki-header">
          <h1 className="wiki-title">PercyPedia</h1>
          <p className="wiki-subtitle">
            Dein umfassendes Ernährungs-Lexikon für Vitamine, Mineralien, Proteine & Supplements
          </p>
        </div>

        {/* Search & Filter */}
        <div className="wiki-search-section">
          <div className="relative">
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-light-text opacity-50"
            />
            <input
              type="text"
              placeholder="Suche nach Nährstoffen, Funktionen oder Quellen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="wiki-search-input pl-12"
            />
          </div>

          <div className="wiki-filter-chips">
            <button
              onClick={() => setActiveFilter("all")}
              className={`wiki-filter-chip ${activeFilter === "all" ? "active" : ""}`}
            >
              Alle
            </button>
            <button
              onClick={() => setActiveFilter("vitamine")}
              className={`wiki-filter-chip vitamine ${activeFilter === "vitamine" ? "active" : ""}`}
            >
              <Icon icon="mdi:vitamin-outline" className="inline mr-1" />
              Vitamine
            </button>
            <button
              onClick={() => setActiveFilter("mineralien")}
              className={`wiki-filter-chip mineralien ${activeFilter === "mineralien" ? "active" : ""}`}
            >
              <Icon icon="mdi:atom" className="inline mr-1" />
              Mineralien
            </button>
            <button
              onClick={() => setActiveFilter("proteine")}
              className={`wiki-filter-chip proteine ${activeFilter === "proteine" ? "active" : ""}`}
            >
              <Icon icon="mdi:dna" className="inline mr-1" />
              Proteine
            </button>
            <button
              onClick={() => setActiveFilter("supplements")}
              className={`wiki-filter-chip supplements ${activeFilter === "supplements" ? "active" : ""}`}
            >
              <Icon icon="mdi:pill" className="inline mr-1" />
              Supplements
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-light-text mb-4">
              {searchResults.length} Ergebnis{searchResults.length !== 1 ? "se" : ""} für "{searchTerm}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="wiki-nutrient-list">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className={`wiki-nutrient-item ${item.categoryKey} ${openNutrients[item.id] ? "open" : ""}`}
                  >
                    <div
                      className="wiki-nutrient-header"
                      onClick={() => toggleNutrient(item.id)}
                    >
                      <h3 className="wiki-nutrient-name">{item.name}</h3>
                      <Icon
                        icon="mdi:chevron-down"
                        className={`wiki-nutrient-toggle ${openNutrients[item.id] ? "open" : ""}`}
                      />
                    </div>

                    {openNutrients[item.id] && (
                      <div className="wiki-nutrient-content">
                        <div className="wiki-nutrient-section">
                          <h4 className="wiki-nutrient-section-title">Funktion</h4>
                          <p className="wiki-nutrient-section-content">{item.function}</p>
                        </div>

                        <div className="wiki-nutrient-section">
                          <h4 className="wiki-nutrient-section-title">
                            {item.dailyNeed ? "Tagesbedarf" : "Dosierung"}
                          </h4>
                          <p className="wiki-nutrient-section-content">
                            {item.dailyNeed || item.dosage}
                          </p>
                        </div>

                        <div className="wiki-nutrient-section">
                          <h4 className="wiki-nutrient-section-title">Quellen</h4>
                          <p className="wiki-nutrient-section-content">{item.sources}</p>
                        </div>

                        {item.special && (
                          <div className="wiki-nutrient-section">
                            <h4 className="wiki-nutrient-section-title">Besonderheiten</h4>
                            <p className="wiki-nutrient-section-content">{item.special}</p>
                          </div>
                        )}

                        {item.warning && (
                          <div className="wiki-warning-box">
                            <h4 className="wiki-warning-title">⚠️ Wichtiger Hinweis</h4>
                            <p className="wiki-warning-content">{item.warning}</p>
                          </div>
                        )}

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wiki-external-link"
                          >
                            <span>Mehr erfahren</span>
                            <Icon icon="mdi:open-in-new" className="wiki-external-link-icon" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="wiki-no-results">
                <Icon icon="mdi:search-off" className="wiki-no-results-icon" />
                <p className="wiki-no-results-text">
                  Keine Ergebnisse gefunden. Versuche einen anderen Suchbegriff.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!searchTerm && (
          <div className="wiki-categories">
            {filteredCategories.map(([categoryKey, category]) => (
              <div key={categoryKey} className={`wiki-category-card category-${categoryKey}`}>
                <div
                  className="wiki-category-header"
                  onClick={() => toggleCategory(categoryKey)}
                >
                  <Icon icon={category.icon} className={`wiki-category-icon category-${categoryKey}`} />
                  <h2 className={`wiki-category-title category-${categoryKey}`}>
                    {category.categoryName}
                  </h2>
                  <Icon
                    icon="mdi:chevron-down"
                    className={`wiki-category-toggle ${openCategories[categoryKey] ? "open" : ""}`}
                  />
                </div>

                {openCategories[categoryKey] && (
                  <div className="wiki-category-content">
                    <p className="wiki-category-description">{category.description}</p>

                    {/* Subcategories (Vitamine & Proteine) */}
                    {category.subcategories &&
                      category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex} className="wiki-subcategory">
                          <h3 className="wiki-subcategory-title">{subcategory.name}</h3>
                          <p className="wiki-subcategory-description">
                            {subcategory.description}
                          </p>

                          <div className="wiki-nutrient-list">
                            {subcategory.items.map((item) => (
                              <div
                                key={item.id}
                                className={`wiki-nutrient-item ${categoryKey} ${openNutrients[item.id] ? "open" : ""}`}
                              >
                                <div
                                  className="wiki-nutrient-header"
                                  onClick={() => toggleNutrient(item.id)}
                                >
                                  <h3 className="wiki-nutrient-name">{item.name}</h3>
                                  <Icon
                                    icon="mdi:chevron-down"
                                    className={`wiki-nutrient-toggle ${openNutrients[item.id] ? "open" : ""}`}
                                  />
                                </div>

                                {openNutrients[item.id] && (
                                  <div className="wiki-nutrient-content">
                                    <div className="wiki-nutrient-section">
                                      <h4 className="wiki-nutrient-section-title">Funktion</h4>
                                      <p className="wiki-nutrient-section-content">{item.function}</p>
                                    </div>

                                    <div className="wiki-nutrient-section">
                                      <h4 className="wiki-nutrient-section-title">
                                        {item.dailyNeed ? "Tagesbedarf" : "Dosierung"}
                                      </h4>
                                      <p className="wiki-nutrient-section-content">
                                        {item.dailyNeed || item.dosage}
                                      </p>
                                    </div>

                                    <div className="wiki-nutrient-section">
                                      <h4 className="wiki-nutrient-section-title">Quellen</h4>
                                      <p className="wiki-nutrient-section-content">{item.sources}</p>
                                    </div>

                                    {item.special && (
                                      <div className="wiki-nutrient-section">
                                        <h4 className="wiki-nutrient-section-title">Besonderheiten</h4>
                                        <p className="wiki-nutrient-section-content">{item.special}</p>
                                      </div>
                                    )}

                                    {item.warning && (
                                      <div className="wiki-warning-box">
                                        <h4 className="wiki-warning-title">⚠️ Wichtiger Hinweis</h4>
                                        <p className="wiki-warning-content">{item.warning}</p>
                                      </div>
                                    )}

                                    {item.link && (
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="wiki-external-link"
                                      >
                                        <span>Mehr erfahren</span>
                                        <Icon
                                          icon="mdi:open-in-new"
                                          className="wiki-external-link-icon"
                                        />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                    {/* Direct Items (Mineralien & Supplements) */}
                    {category.items && (
                      <div className="wiki-nutrient-list">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className={`wiki-nutrient-item ${categoryKey} ${openNutrients[item.id] ? "open" : ""}`}
                          >
                            <div
                              className="wiki-nutrient-header"
                              onClick={() => toggleNutrient(item.id)}
                            >
                              <h3 className="wiki-nutrient-name">{item.name}</h3>
                              <Icon
                                icon="mdi:chevron-down"
                                className={`wiki-nutrient-toggle ${openNutrients[item.id] ? "open" : ""}`}
                              />
                            </div>

                            {openNutrients[item.id] && (
                              <div className="wiki-nutrient-content">
                                <div className="wiki-nutrient-section">
                                  <h4 className="wiki-nutrient-section-title">Funktion</h4>
                                  <p className="wiki-nutrient-section-content">{item.function}</p>
                                </div>

                                <div className="wiki-nutrient-section">
                                  <h4 className="wiki-nutrient-section-title">
                                    {item.dailyNeed ? "Tagesbedarf" : "Dosierung"}
                                  </h4>
                                  <p className="wiki-nutrient-section-content">
                                    {item.dailyNeed || item.dosage}
                                  </p>
                                </div>

                                <div className="wiki-nutrient-section">
                                  <h4 className="wiki-nutrient-section-title">Quellen</h4>
                                  <p className="wiki-nutrient-section-content">{item.sources}</p>
                                </div>

                                {item.special && (
                                  <div className="wiki-nutrient-section">
                                    <h4 className="wiki-nutrient-section-title">Besonderheiten</h4>
                                    <p className="wiki-nutrient-section-content">{item.special}</p>
                                  </div>
                                )}

                                {item.warning && (
                                  <div className="wiki-warning-box">
                                    <h4 className="wiki-warning-title">⚠️ Wichtiger Hinweis</h4>
                                    <p className="wiki-warning-content">{item.warning}</p>
                                  </div>
                                )}

                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="wiki-external-link"
                                  >
                                    <span>Mehr erfahren</span>
                                    <Icon icon="mdi:open-in-new" className="wiki-external-link-icon" />
                                  </a>
                                )}
                              </div>
                            )}
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

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button onClick={scrollToTop} className="wiki-scroll-top">
            <Icon icon="mdi:arrow-up" className="text-2xl" />
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
