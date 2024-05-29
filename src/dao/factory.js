import {daoType} from "../config/config.js"
import DaoMemory from "./memory/memory-manager";
import DaoMongo from "./mongo/mongo-manager";

const Dao = daoType == "mongo"? DaoMongo : DaoMemory;

export default Dao;