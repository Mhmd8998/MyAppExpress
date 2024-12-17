const express = require("express");
const router = express.Router();
const controller = require("../controlaer/Posts"); // تأكد من أن المسار صحيح

router.post("/", controller.insertPost);
router.get("/", controller.getAllPosts);
module.exports = router;
