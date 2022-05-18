const Router = require("express");
const router = new Router();
const messageController = require("../controllers/MessageController.js");

router.get("/", messageController.getMessage);
router.post("/send_message", messageController.createMessage);

module.exports = router;
