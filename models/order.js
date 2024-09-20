const {Schema, model} = require('mongoose');

const { handleMongooseError } = require("../helpers");

// add mongoose schem
const orderSchem = new Schema({
    _id: {
        type: String,
        required: true,
    },
    orderName: {
        type: String,
        required: false,
        default: '',
    },
    orderQuantity: {
        type: String,
        required: true,
        default: '',
    },
    orderPrice: {
        type: String,
        required: false,
        default: '',
    },
    orderAvailability: {
        type: String,
        required: false,
        default: '',
    },
    description: {
        type: String,
        required: false,
        default: '',
    }, 
}, {versionKey: false, timestamps: true,});

orderSchem.post("save", handleMongooseError);

// create model on 'prescriptionSchem' base
const Orders = model('order', orderSchem);

module.exports = Orders;