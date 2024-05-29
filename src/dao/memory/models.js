import CartDTO from "../../dto/carts.dto.js";
import ProductDTO from "../../dto/products.dto.js";
import MsgDTO from "../../dto/msgs.dto.js";
import UserDTO from "../../dto/users.dto.js";
import TicketDTO from "../../dto/tickets.dto.js";
let models = {
    carts: [],
    messages: [],
    tickets: [],
    products: [],
    users: [],
};
let DTOs = {
    carts: CartDTO,
    messages: MsgDTO,
    tickets: TicketDTO,
    products: ProductDTO,
    users: UserDTO,
};
export {models, DTOs};