import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers?.authorization) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          msg: "unauthorization!",
          code: 401,
        },
      });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        success: false,
        error: {
          msg: "unauthorization!",
          code: 401,
        },
      });
    }
    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          msg: "unauthorization!",
          code: 401,
        },
      });
    }
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { msg: error.message, code: 400 },
    });
  }
};
