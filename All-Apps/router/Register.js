const app = require("express");
const router = app.Router();
const controller = require("../controlaer/Register");

router.post("/",controller.insertUser);
router.post("/login",controller.login);

module.exports = router;
