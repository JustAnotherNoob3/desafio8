import config from "../config/config.js"
import DaoMemory from "./memory/memory-manager.js";
import DaoMongo from "./mongo/mongo-manager.js";

const Dao = config.daoType === "memory" ? DaoMemory :DaoMongo;

export default Dao;