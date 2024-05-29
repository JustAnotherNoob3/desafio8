export default class MsgDTO{
    constructor(msg){
        this.id = msg._id
        this.message = msg.message;
        this.author = msg.user
    }
}