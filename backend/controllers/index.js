import asyncErrors from '../middlewares/asyncError.js';

// Logout a user.
export const logout = asyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
});
