import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';
import * as XLSX from 'xlsx';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const downloadExcel = () => {
    const tempOrders = orders;
    const resultOrders = tempOrders.map((originalData)=>{
      const productsObject = {}
      originalData.products.map((obj) => {
        productsObject[obj['name']]=obj['count']
      })

      console.log(productsObject)
      const modifiedData = {
        _id: originalData._id,
        status: originalData.status,
        products: JSON.stringify(productsObject),
        address: originalData.address,
        amount: originalData.amount,
        user:  originalData.user.name,
        orderDate: moment(originalData.createdAt).format('DD-MM-YYYY')
      };
      return modifiedData
    })
    const ws = XLSX.utils.json_to_sheet(resultOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders Data');

    // Save the file
    XLSX.writeFile(wb, `Orders Data as of ${moment().format('DD-MM-YYYY')}.xlsx`);
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='orders-header'>Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
    // console.log('update order status');
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {o.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title='Orders'
      description={`Hey ${user.name}, you can manage all the ordes here`}
    >
      <div style={{textAlign:'center'}}>
      <button className='download-btn' onClick={downloadExcel}>Download Excel</button>

      </div>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}

          {orders.map((o, oIndex) => {
            return (
              <div
                className='mt-5'
                key={oIndex}
                style={{ borderBottom: '5px solid red' }}
              >             

                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(o)}</li>
                  <li className='list-group-item'>Order ID: {o._id}</li>
                  <li className='list-group-item'>Amount: Rs.{o.amount}</li>
                  <li className='list-group-item'>Ordered by: {o.user.name}</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).format('DD-MM-YY HH:MM')} ({moment(o.createdAt).fromNow()})
                  </li>
                  <li className='list-group-item'>
                    Delivery address: {o.address}
                  </li>
                  <li className='list-group-item'>
                  </li>
                  <li className='list-group-item'>
                    No. of Products in Order: {o.products.length}
                  </li>
              
                {o.products.map((p, pIndex) => (
          <li className='list-group-item'>
            {p.name} : {p.count}
          </li>
          ))}
                </ul>

      

                {/* {o.products.map((p, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product Qty', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))} */}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
