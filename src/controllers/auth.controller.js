import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user/user.model.js";
import { JWT_SECRET } from "../utils/secret.js";
import { asyncHandler } from "../middleware/async-handler.middleware.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HttpException } from "../utils/http.exception.js";
export class AuthController {
  static signUp = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;

    if (!first_name || !last_name || !email || !phone || !password) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        "All fields are required."
      );
    }

    const oldUser = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (oldUser) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        "This user already exists."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser;
    try {
      newUser = await userModel.create({
        first_name,
        last_name,
        email,
        password: hashPassword,
        phone,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new HttpException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        "Failed to create user."
      );
    }

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully!",
      token,
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  });

  static signIn = asyncHandler(async (req, res) => {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        "Email/phone and password are required."
      );
    }

    // Find the user
    const user = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        "User not found."
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        "Invalid password."
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send response
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      },
    });
  });

  static me = asyncHandler(async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        throw new HttpException(
          StatusCodes.UNAUTHORIZED,
          ReasonPhrases.UNAUTHORIZED,
          "User not authenticated."
        );
      }

      res.status(StatusCodes.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error in me method:", error);
      throw new HttpException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        "Failed to fetch user data."
      );
    }
  });
}
