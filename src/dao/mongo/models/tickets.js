import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

const collection = "Tickets";

const schema = new Schema({
    code: String,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    purchase_datetime: String,
    amount:Number,
    purchaser: String
});
schema.plugin(mongoosePaginate);
const ticketsModel = mongoose.model(collection, schema);
export { ticketsModel };