import { verifyToken } from "@clerk/backend";

export const clerkAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Kein Token gefunden" });
    }

    const token = header.split[1];
    const payload = await verifyToken(token);
    req.userId = payload.sub; // Clerk userId
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Ungültiges Token" });
  }
};
