const express = require('express');
const { validateBody } = require('../../middlewares');

const controllers = require('../../controllers/orders');

// joi schemas
const schemas = require('../../schemas');

// create most routes
const pillsRouter = express.Router();

pillsRouter.get("/", controllers.getOrders);
pillsRouter.get("/:id", controllers.getOrderById);
pillsRouter.post("/", validateBody(schemas.orderSchem), controllers.addOrder);
pillsRouter.put("/:id", validateBody(schemas.orderSchem), controllers.updateOrderById);
pillsRouter.delete("/", validateBody(schemas.orderSchem), controllers.deleteOrderById);

// export to app
module.exports = pillsRouter;