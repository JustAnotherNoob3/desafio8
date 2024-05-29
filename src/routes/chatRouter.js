import { Router } from "express";
import { __dirname } from "../utils.js";
import chatController from "../controllers/chatController.js";
import { isAdmin, isNotAdmin } from "../auth.js";
const chatRouter = Router();

chatRouter.get("/", chatController.getMessages);
chatRouter.post("/", isNotAdmin, chatController.sendMessage);

chatRouter.put("/:pid",chatController.editMessage);
chatRouter.delete("/clean" ,isAdmin, chatController.cleanChat);
chatRouter.delete("/:pid", isAdmin, chatController.deleteMessage);


export default chatRouter;