import jwt from "jsonwebtoken";
import { userModel } from "../models/user/user.model.js";

import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { JWT_SECRET } from "../utils/secret.js";
import { HttpException } from "../utils/http.exception.js";
import { asyncHandler } from "./async-handler.middleware.js";

export const protect = (requireAuth = true) =>
  asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
          throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            "User not found."
          );
        }

        req.user = user; // attach user to request
      } catch (err) {
        if (requireAuth) {
          throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            "Invalid token."
          );
        }
      }
    } else if (requireAuth) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
        "No token provided."
      );
    }

    next();
  });
