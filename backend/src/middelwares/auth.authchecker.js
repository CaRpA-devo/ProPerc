import { createError } from "../utils/createError.js";

createError;

export const authChecker = (req, res, next) => {
  if (req.headers.authorization === "20") {
    next();
    return;
  }

  next(createError(401, "Unauthorized")); // Mit Fehler, Error-handling Middleware aufgerufen wird
};
