import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, mobile, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data)
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{mobile}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
            {history.map((h, i) => {
              return (
                <li className='list-group-item'>
                <div>
                  <div>
                  <h6>Order Id: {h._id}</h6>
                  <h6>Order Date: {moment(h.createdAt).format('DD-MM-YYYY')}</h6>
                  <h6>Total Order Amount: Rs. {h.amount}</h6>
                  <h6>Order Status: {h.status}</h6>
                  <hr/>
                  <h6>Order Details:</h6>

                  </div>
                    {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>{p.name}: Quantity: {p.count}</h6>
                      </div>
                    );
                  })}

                </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
