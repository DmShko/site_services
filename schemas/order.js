const Joi = require("joi");

const orderSchema = Joi.object({
  _id: Joi.string().required(),
  orderName: Joi.string().allow(''),
  orderQuantity: Joi.string().required(),
  orderPrice: Joi.string().allow(''),
  orderAvailability: Joi.string().allow(''),
  description: Joi.string().allow(''),
});

module.exports = { orderSchema };
