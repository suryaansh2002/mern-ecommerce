import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

import Copyright from './Copyright';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div style={{paddingTop:'4rem'}}>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
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
      Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
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
        <div style={{paddingTop:'4rem'}} className='col-md-4'>
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
