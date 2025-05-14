import Router from "express";
import { authRouter } from "./auth/auth.route.js";
import Laptoprouter from "./products/laptop.router.js";
import CartRouter from "./cart/cart.router.js";

const routeR = Router();

routeR.use("/auth", authRouter);
routeR.use("/laptop", Laptoprouter);
routeR.use("/cart", CartRouter);

export default routeR;
