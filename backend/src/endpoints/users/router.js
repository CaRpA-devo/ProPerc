import { Router } from "express";
import { userControllerGET, userControllerPOST } from "./controller.js";
import { authChecker } from "../../middelwares/auth.authchecker.js";
authChecker;
export const user_router = Router();

user_router.get("/", authChecker, userControllerGET);
user_router.post("/", authChecker, userControllerPOST);
