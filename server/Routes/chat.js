const router = require("express").Router;
const ChatRoom = require("../database/models/chatRoom");
const { auth } = require("../middleware/auth");
const chatController = require("../controllers/chat");



router.get('/getChats', auth, chatController.getChats);



module.exports = router;
