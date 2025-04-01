import User from "../model/userModel.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email))
      return res.status(400).json({ error: "Invalid email format" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ error: "Username is already taken" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ error: "Email is already registered" });

    const newUser = new User({
      fullName,
      username,
      email,
      password,
    });

    if (newUser) {
      newUser.generateTokenAndSetCookie(res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      return res.status(400).send("Invalid user data");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "No user found, Register" });
    }

    const authenticated = await user.comparePassword(password);
    if (!authenticated) {
      return res.status(400).json({ msg: "username or password is incorrect" });
    }

    user.generateTokenAndSetCookie(res);

    return res.status(200).json({
      status: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
