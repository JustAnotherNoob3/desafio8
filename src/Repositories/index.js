import Dao from "../dao/factory.js";
import { cartsModel } from "../dao/mongo/models/carts.js";
import { msgsModel } from "../dao/mongo/models/messages.js";
import { productsModel } from "../dao/mongo/models/products.js";
import { userModel } from "../dao/mongo/models/users.js";
import { ticketsModel } from "../dao/mongo/models/tickets.js";

let daoProducts = new Dao({mongo:productsModel, file:"products"})
let daoCarts = new Dao({mongo:cartsModel, file:"carts"})
let daoUsers = new Dao({mongo:userModel, file:"users"})
let daoMsgs = new Dao({mongo:msgsModel, file:"messages"})
let daoTickets = new Dao({mongo:ticketsModel, file:"tickets"})

export {daoProducts, daoCarts, daoUsers, daoMsgs, daoTickets};