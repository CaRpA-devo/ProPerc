export const userControllerGET = (req, res, next) => {
  res.status(200).json({
    answer: "Einträge gefunden",
  });
};

export const userControllerPOST = (req, res, next) => {
  res.status(200).json({
    answer: "Eintrag erstellt",
  });
};
