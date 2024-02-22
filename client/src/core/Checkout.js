import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Order Placed Successfully!');


const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const [selectedAddress, setSelectedAddress] = useState('withinNRI')
  const [buildingNo, setBuildingNo] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [completeAddress , setCompleteAddress] = useState('')


  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <Button variant='contained'
                style={{background:'#5c8059', width:'100%', border:'none', borderRadius:'5px', color:'white'}}
                >
          Sign in to checkout
        </Button>
      </Link>
    );
  };

  const placeOrder = (e) =>{
    e.preventDefault();
    let addressValue = ''
    if(selectedAddress === 'withinNRI'){
      addressValue = `Building ${buildingNo}, Flat: ${flatNo}, NRI Complex`
    }
    else{
      addressValue = completeAddress
    }
    const tempData = {...data, address: addressValue}
    console.log(tempData)
    setData(tempData)
    console.log(products)
    const res = getCart();
    console.log(res);
    createOrder(userId, token, {
      products,
      address: addressValue,
      amount: getTotal()
    }).then(
      (res)=>
    {
      console.log(res); 
      if(res){
        emptyCart();
        notify();
        setTimeout(()=>{
        window.location.reload();
        },1000)
       
    
    }
  }
  )
    .catch((e)=>console.log(e))
  
  
  } 
  const handleDropdownChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      <Toaster/>
      {products.length > 0 ? (
        <div>
      <div className="p-4">
      <form>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Select Location:
      </label>
      <select
        id="location"
        name="location"
        value={selectedAddress}
        onChange={handleDropdownChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="withinNRI">Within NRI Complex</option>
        <option value="outsideNRI">Outside NRI Complex</option>
      </select>

      {selectedAddress === 'withinNRI' ? <div>
                        <div className="mb-4">
          <input
            type="number"
            id="buildingNo"
            name="buildingNo"
            value={buildingNo}
            onChange={(e) => setBuildingNo(e.target.value)}
            className="mt-1 mr-2 p-2 border border-gray-300 rounded-md w-100 focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='Enter Building No.'
          />
          <br/>
           <input
            type="number"
            id="flatNo"
            name="flatNo"
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-100 focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='Enter Flat No.'
          />
        </div>
      </div> : <div>
      <textarea
            type="number"
            id="flatNo"
            name="flatNo"
            value={completeAddress}
            onChange={(e) => setCompleteAddress(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-100 focus:outline-none focus:ring focus:border-blue-300"
            required
            placeholder='Enter Address'
          ></textarea>
        </div>}
        <div>
        <button
          type="submit"
          className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        style={{background:'#5c8059', width:'100%', border:'none', borderRadius:'5px'}}
        onClick={placeOrder}
        >
          Place Order
        </button>
          </div>
          </form>

    </div>
{/* 
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          /> */}
          {/* <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button> */}
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className='alert alert-info'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      <h2>Total:Rs.{getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
