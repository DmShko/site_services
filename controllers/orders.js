// import model
const Orders = require('../models/order');
const { HttpError, ctrlWrapper } = require("../helpers");

const schemas = require("../schemas");

const getOrders = async (req, res) => {

  const { _id } = req.user; // see authentificate.js 31 row

  const result = await Orders.find({owner: _id}, '-createdAt -updatedAt');
  // '-createdAt -updatedAt' - for not response 'create' and 'update' fields
  //.populate('owner') - if need responce detail information instead only id

  res.status(200).json(result);

};

const getOrderById = async (req, res) => {

    const { _id } = req.user; // see authentificate.js 31 row
    const { orderId } = req.params;
    const result = await Orders.find({owner: _id, _id: orderId});

    if (result === null || result.length === 0) throw HttpError(404, "Not found");
      
    res.status(200).json(result);

};

const addOrder = async (req, res) => {
    
    const { body } = req;
    const { error } = schemas.orderSchem.validate(body.data);
  
    // check body data second variant
    if (error) {
      
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }
   
    const { _id } = req.user; 
  
    const result = await Orders.create({...body.data, owner: _id});

    res.status(201).json({ message: `Created` });

};

const updateOrderById = async (req, res) => {
 
    const { _id } = req.user;
    const { id } = req.query;
  
    const { body } = req;

    const { error } = schemas.orderSchem.validate(body.data);
    
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }
    
    // find by 'owner' and id and update
    const result = await Orders.findOneAndUpdate({owner: _id, _id: id}, body.data, {new: true});
   
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json({ message: `Orders ${result.orderName} updated` });

};

const deleteOrderById = async (req, res) => {
   
    const { _id } = req.user; 
    
    const { id } = req.query;
   
    const orderName = await Orders.findOne({owner: _id, _id: id});
    // find by owner and id and delete
    const result = await Orders.findOneAndDelete({owner: _id, _id: id});

    if (result === null) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: `Orders ${orderName.orderName} deleted` });
};

module.exports = {
    getOrders: ctrlWrapper(getOrders),
    getOrderById: ctrlWrapper(getOrderById),
    addOrder: ctrlWrapper(addOrder),
    updateOrderById: ctrlWrapper(updateOrderById),
    deleteOrderById: ctrlWrapper(deleteOrderById),
};