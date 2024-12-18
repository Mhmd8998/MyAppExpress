const app = require("express");
const router = app.Router();
const controller = require("../controlaer/Register");

router.post("/",controller.insertUser);

module.exports = router;
