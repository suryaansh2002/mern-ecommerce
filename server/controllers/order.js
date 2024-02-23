const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// const accountSid = 'AC47c18c4473b3bd09623f835cdbd935b0';
// const authToken = 'b1f59f60ff11b2831c6a566e2fbc6fa3';

const accountSid = 'AC47c18c4473b3bd09623f835cdbd935b0';
const authToken = 'b1f59f60ff11b2831c6a566e2fbc6fa3';

// const client = require('twilio')(accountSid, authToken);

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  // console.log('CREATE ORDER: ', req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    console.log(data)
    let msgString = `
    Your Order #${data._id} has been placed successfully!\n
    Your total amount is: Rs. ${data.amount} and your order will be delivered to: ${data.address}.
    Please see the dashboard for your Order Details.`

    msgString = `
New Order: #${data._id} has been placed successfully!\n
Total Order amount is: Rs. ${data.amount}\n
Order to be delivered to: ${data.user.name} at: ${data.address}.\n
Order Details are:\n`
    data.products.map((p)=>{
      msgString+=`Item: ${p.name}, Quantity: ${p.count}\n`
    })
    msgString+= `\nContact No: ${data.user.mobile}`
    console.log(msgString)
  //  const response =  client.messages
  //   .create({
  //       body: msgString,
  //       from: 'whatsapp:+14155238886',
  //       to: 'whatsapp:+919619514015'
  //   })
  //   .then(message => {
  //     console.log(message)
  //   })

    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};
