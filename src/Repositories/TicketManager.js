import { daoTickets } from "./index.js";
import { __dirname } from '../utils.js';

class TicketManager {
    async generateTicket(products, amount, email) {
        let newDate = new Date(Date.now());
        let ticket = {
            code: crypto.randomUUID(),
            products: products,
            purchase_datetime: newDate.toUTCString(),
            amount: amount,
            purchaser: email
        };
        let newTicket = await daoTickets.create(ticket);
        return newTicket._id;
    }
    async getAllTicketsRelatedToEmail(email){
        daoTickets.getByOther({purchaser: email});
    }
}

const ticketManager = new TicketManager();
export default ticketManager;


