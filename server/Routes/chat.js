const router = require("express").Router;
const { auth } = require("../middleware/auth");
const chatController = require("../controllers/chat");
const ChatRoom = require("../database/models/chatRoom");


router.get('/getChats', auth, chatController.getChats);



exports.default = router;
