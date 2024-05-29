export default class TicketDTO{
    constructor(ticket){
        this.id = ticket._id
        this.code = ticket.code
        this.products = ticket.products
        this.quantity = ticket.quantity
        this.purchase_datetime = ticket.purchase_datetime
        this.amount = ticket.amount
        this.purchaser = ticket.purchaser
    }
}