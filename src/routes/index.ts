import * as express from "express";
import userControler from "../controlers/userControler";
import authentication from "../middleware/authentication";
import profileControler from "../controlers/profileControler";
import uploadMiddleware from "../middleware/upload";
import threadControler from "../controlers/threadControler";
import likeControler from "../controlers/likeControler";
import followControler from "../controlers/followControler";

const Routes = express.Router();

// THIS IS ROUTES AUTH USER
Routes.get("/users", authentication, userControler.getUsers);
Routes.get("/sugested", authentication, userControler.getUserNotId);
Routes.post("/register", userControler.register);
Routes.post("/login", userControler.login);
Routes.get("/check", authentication, userControler.check);

// THIS IS ROUTES PROFILE USER
Routes.patch(
  "/profile",
  authentication,
  uploadMiddleware("cover"),
  profileControler.updateProfile
);

Routes.get("/profile", authentication, profileControler.getProfile);
Routes.get("/profile/:id", authentication, profileControler.getProfileById);

// THIS IS ROUTES THREADS

Routes.get("/threads", authentication, threadControler.getThreads);
Routes.get("/thread", authentication, threadControler.getThreadById);
Routes.get("/thread/:id", authentication, threadControler.getThread);
Routes.get(
  "/thread/user/:userId",
  authentication,
  threadControler.getThreadUser
);
Routes.post(
  "/thread",
  authentication,
  uploadMiddleware("image"),
  threadControler.createThread
);

// ROUTES
Routes.get("/replies/:id", authentication, threadControler.getReplies);
Routes.post("/like", authentication, likeControler.createLike);
Routes.get("/like/:threadId", authentication, likeControler.getLikes);
Routes.get("/likes/:threadId/", authentication, likeControler.getAllLikes);
Routes.post("/follow", authentication, followControler.createFollow);
Routes.get("/following", authentication, followControler.getFollowingUsers);
Routes.get("/follower", authentication, followControler.getFollowerUsers);
Routes.get("/followers", authentication, followControler.getFollowers);

export default Routes;
