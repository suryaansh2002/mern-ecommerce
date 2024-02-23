const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// const accountSid = 'AC47c18c4473b3bd09623f835cdbd935b0';
// const authToken = 'b1f59f60ff11b2831c6a566e2fbc6fa3';
const axios = require('axios')
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

    const url = 'https://messages-sandbox.nexmo.com/v1/messages';
    const apiKey = '45fbc761';
    const apiSecret = 'uCusykpRR2d2CXTx';
    const fromNumber = '14157386102';
    const toNumber = '919619514015';
    
    const requestData = {
      from: fromNumber,
      to: toNumber,
      message_type: 'text',
      text: msgString,
      channel: 'whatsapp',
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Create a base64 encoded authentication string
    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
    // Make the Axios POST request
    axios.post(url, requestData, {
      headers: {
        ...headers,
        'Authorization': `Basic ${authString}`,
      },
    })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
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
  .sort({ createdAt: -1 }) // Use -1 to sort in descending order (most recent first)
  .exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err), // Fix typo: 'error' should be 'err'
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
