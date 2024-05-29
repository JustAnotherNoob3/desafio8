export default class UserDTO{
    constructor(user){
        this.email = user.email;
        this.name = user.first_name + " " + user.last_name;
        this.cart = user.cart;
        this.age = user.age
        this.role = user.role;
    }
}