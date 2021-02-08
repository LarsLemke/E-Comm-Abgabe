const express = require("express");
const router = express.Router();
const Video = require("../modules/Video");
const ytfps = require("ytfps");

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const video = new Video({
      url: req.body.video.url,
      titel: req.body.video.titel,
      nacken: req.body.video.nacken,
      ruecken: req.body.video.ruecken,
      handgelenke: req.body.video.handgelenke,
      knie: req.body.video.knie,
      huefte: req.body.video.huefte,
      schulter: req.body.video.schulter,
      fussgelenke: req.body.video.fussgelenke,
      playlist: req.body.video.playlist,
    });
    const newVideo = await video.save();
    res.send(true);
  } catch (error) {
    res.send(false);
    res.json({ message: error });
  }
});

router.get("/getRecomendet/:userID", async (req, res) => {
  try {
    const recVideos = await Video.findById(req.params.userID);
    const video = await Video.find();

    res.json(recVideos);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const video = await Video.find();
    console.log("finde all Videos");
    res.json(video);
  } catch (error) {
    res.json({ message: error });
  }
});
router.get("/getPlaylist/:id", async (req, res) => {
  try {
    console.log("playlist");
    const video = await Video.find({ playlist: req.params.id });
    console.log("finde Playlist");
    res.json(video);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/delete/:deleteID", async (req, res) => {
  try {
    //  console.log(req.body);
    console.log(req.params.deleteID);
    const video = await Video.findByIdAndDelete(req.params.deleteID);
    console.log(video);

    res.send(true);
  } catch (error) {
    res.json({ message: error });
    res.send(false);
  }
});

router.post("/lastWatched:postId", async (req, res) => {
  //body mit mail und Video ID
  try {
    //Account history
    //Account lastWatched updaten

    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Video.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
