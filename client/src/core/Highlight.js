import React, {useState} from 'react'
import ShowImage from './ShowImage'
import { API } from '../config';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { isAuthenticated } from '../auth';

export default function Highlight({product}) {
    const { user, token } = isAuthenticated();

    const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
      };
      const [redirect, setRedirect] = useState(false);
      const shouldRedirect = (redirect) => {
        if (redirect) {
          return <Redirect to='/cart' />;
        }
      };
    
      return (

    <div>
                    {shouldRedirect(redirect)}

        <div className='highlit-header'>Latest Product:</div>
        <div className='highlight-card'>
           <h2>
            
           {product.name}
            </h2> 
            <div>
                <div className='highlight-content'>
                <div className='highlight-content-left'>
                <img
      src={`${API}/product/photo/${product._id}`}
      alt={product.name}
      className='mb-3'
      style={{ objectFit: 'contain', width: '100%', height:'20rem' }}

    />
                </div>
                <div className='highlight-content-right'>
                    <p>{product.description}</p>
                    
              <div className='card-flex'>
                <div>
                  <span> {product.category && product.category.name}</span>
                </div>
                <div className='card-price'>
                {user ? <>Rs. {user.inNRI ? product.price1 : product.price2}</> : 
                <a style={{color: 'black', fontWeight:'normal',textDecoration: 'underline'}} href={'/signin'}>View Price</a>
                 }
                </div>
              </div>
                    <Button onClick={addToCart} style={{width:'100%' , border:'1px solid', background:'#5c8059', color:'white'}} 
        variant='contained'
        >
          Add to cart
        </Button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
