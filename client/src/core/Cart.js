import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

import Copyright from './Copyright';
import { Button } from '@material-ui/core';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div style={{paddingTop:'3rem'}}>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div>
            <Link to={'/'}>
            <Button style={{width:'90%', textAlign:'center', background:'#5c8059', marginLeft:'5%', color:'white'}}>Continue Shopping</Button>
            </Link>
          </div>
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2  style={{paddingTop:'4rem'}}
    >
      <div style={{fontSize:'1.8rem', textAlign:'center', background:'lightgray', borderRadius:'5px', width:'90%', marginLeft:'5%', padding:'0.5rem'}}>
      Your cart is empty. 

        </div>
      <br /> 
      <div>
            <Link to={'/'}>
            <Button style={{width:'90%', textAlign:'center', background:'#5c8059', marginLeft:'5%', color:'white'}}>Continue Shopping</Button>
            </Link>
          </div>
    </h2>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
        
          {items.length > 0 ? showItems(items) : noItemsMessage()}
         
        </div>
        <div style={{paddingTop:'2.5rem'}} className='col-md-4'>
          <h2 className='mb-4'>Checkout</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className='col-md-2'></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
