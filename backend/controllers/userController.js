import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { auth as firebaseAuth } from "../firebase.js";
import dotenv from "dotenv";
dotenv.config();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const {
      user: { emailVerified },
    } = await firebaseAuth.signInWithEmailAndPassword(email, password);

    const user = await User.findOne({ email });

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        verified: emailVerified,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(404);
    var errorMessage = e.message;
    if (
      errorMessage ===
      "The password is invalid or the user does not have a password."
    ) {
      errorMessage = "Invalid password";
    } else if (
      errorMessage ===
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      errorMessage = "User not found";
    }
    throw new Error(errorMessage);
  }
});

// @desc    Resend email notification
// @route   POST /api/users/login/email-verification
// @access  Private
const sendEmailVerification = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const {
      user: { emailVerified },
    } = await firebaseAuth.signInWithEmailAndPassword(email, password);
    await firebaseAuth.currentUser.sendEmailVerification();
    res.json({ status: "Email verification sent." });
  } catch (e) {
    var errorMessage = e.message;
    if (
      e.message ===
      "We have blocked all requests from this device due to unusual activity. Try again later."
    ) {
      errorMessage = "Please wait a few minutes and check your inbox.";
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
});

// @desc    Resend email notification
// @route   POST /api/users/login/forget-password
// @access  Private
const sendForgetPasswordEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    firebaseAuth.sendPasswordResetEmail(email);
    res.json({ status: "Password reset email sent." });
  } catch (e) {
    var errorMessage = e.message;
    if (
      e.message ===
      "We have blocked all requests from this device due to unusual activity. Try again later."
    ) {
      errorMessage = "Please wait a few minutes and check your inbox.";
    }
    throw new Error(errorMessage);
  }
});

// @desc    Create user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  const {
    user: { emailVerified },
  } = await firebaseAuth.createUserWithEmailAndPassword(email, password);
  await firebaseAuth.currentUser.sendEmailVerification();

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    isAdmin: isAdmin || false,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      verified: emailVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // TODO: maybe delete user in firebase

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  sendEmailVerification,
  sendForgetPasswordEmail,
};
