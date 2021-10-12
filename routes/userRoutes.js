const { Router } = require("express");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/profile/:user_id", requireAuth, async (req, res) => {
  const userId = req.params["user_id"].trim();
  try {
    // get user (without password)
    const user = await User.findOne({ _id: userId }).select("-password");
    // get all the post by that user
    const posts = await Post.find({ _id: postedBy }).populate(
      "postedBy",
      "_id email"
    );
    res.status(200).json(user, posts);
    console.log("other users's feed", user, post);
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
});

router.patch("/follow", requireAuth, checkUser, async (req, res) => {
  try {
    const userToFollowId = req.body.followId.trim();
    const userLoggedInId = req.user._id;
    // update user to be followed
    const userToFollow = await User.findByIdAndUpdate(
      { _id: userToFollowId },
      {
        $push: { followers: userLoggedInId },
      },
      {
        new: true,
      }
    );

    const userLoggedIn = await User.findByIdAndUpdate(
      { _id: userLoggedIn },
      {
        $push: { following: userToFollowId },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ result: `${userLoggedInId} followed ${userToFollowId}` });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
});

router.patch("/unfollow", requireAuth, checkUser, async (req, res) => {
  try {
    const userToUnfollowId = req.body.followId.trim();
    const userLoggedInId = req.user._id;
    // update user to be followed
    const userToUnfollow = await User.findByIdAndUpdate(
      { _id: userToUnfollowId },
      {
        $pull: { followers: userLoggedInId },
      },
      {
        new: true,
      }
    );

    const userLoggedIn = await User.findByIdAndUpdate(
      { _id: userLoggedIn },
      {
        $push: { following: userToUnfollowId },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ result: `${userLoggedInId} unfollowed ${userToUnfollowId}` });
  } catch (e) {
    res.status(500).send(e.message);
    console.log(e);
  }
});

router.put("/updateAvatar", requireAuth, checkUser, async (req, res) => {
  const avatarURL = req.body.avatarURL;
  try {
    const user = User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { avatar: avatarURL },
      },
      { new: true }
    );
    res.status(200).json({ message: "pic uploaded" });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.patch("/updateBio", requireAuth, checkUser, async(req, res) => {
  const bio = req.body.bio
  const personality = req.body.personality
  const role = req.body.role
  const nickname = req.body.nickname
  try{
    const user = User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { bio, nickname, personalityType: personality, role},
      },
      { new: true }
    );
  }catch(e){
    console.log(e)
    res.status(500).send(e)
  }
})

module.exports = router;
