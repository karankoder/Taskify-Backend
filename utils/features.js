import jwt from 'jsonwebtoken';

export const saveCookie = (user, res, statusCode, message) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(statusCode)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
        sateSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'development' ? false : true,
      })
      .json({
        success: true,
        message: message,
      });
  } catch (error) {
    next(error);
  }
};
