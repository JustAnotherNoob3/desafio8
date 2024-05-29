import {msgsModel} from "../dao/mongo/models/messages.js"
import { daoMsgs } from "./index.js";
import mongoose from "mongoose";
import { __dirname } from '../utils.js';

class ChatManager {
    async addMessage(message) {
        let newMessage = await daoMsgs.create(message);
        return newMessage._id;
    }
    async updateContent(messageId, content) {
        try { (await daoMsgs.update(messageId, {message: content})).errors } catch { throw new Error("No message with ID " + cartId); }
    }
        async deleteMessage(messageId) {
        try { (await daoMsgs.delete(messageId)).errors } catch { throw new Error("No message with ID " + cartId); }
    }
    async getMessages() {
        let products = await daoMsgs.get();
        return products;
    }
    async cleanMessages(){
        await daoMsgs.deleteMany({});
    }
}

const chatManager = new ChatManager();
export default chatManager;


