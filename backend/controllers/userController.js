import Auth from "../modal/authModal.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {
    next(err);
  }
};