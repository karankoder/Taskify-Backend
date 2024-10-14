import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const saveCookie = (user, res, next, statusCode, message) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(statusCode)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 31 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
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

export const saveGoogleCookie = async (user, res, next, statusCode) => {
  try {
    let findUser = await User.findOne({ email: user.emails[0].value }).select(
      '+password'
    );
    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie('token', token, {
      httpOnly: true,
      maxAge: 31 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    console.log(findUser.password);
    if (findUser.password === null) {
      res.redirect('http://localhost:5173/set-password');
    } else {
      res.redirect('http://localhost:5173/main');
    }
  } catch (error) {
    next(error);
  }
};
export const cookieRefresher = (req, res, next) => {
  const { token } = req.cookies;

  res.status(200).cookie('token', token, {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV === 'development' ? false : true,
  });

  next();
};
