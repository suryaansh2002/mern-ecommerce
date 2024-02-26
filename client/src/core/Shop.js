import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Button from '@material-ui/core/Button';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { makeStyles } from '@material-ui/core/styles';

import Search from './Search';
import { prices } from './fixedPrices';
import Copyright from './Copyright';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Highlight from './Highlight';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [highlightedResults, setHighlightedResults] = useState({})
  const [showFilter, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const getHighlightedResults = ()=>{
    getFilteredProducts(skip, limit, {highlight: [true]}).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
      console.log(data.data)
      setHighlightedResults(data.data[0])
      }
    });

  }
  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const useStyles = makeStyles((theme) => ({
    btn: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 20px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  }));

  const classes = useStyles();

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div style={{textAlign:'center'}}>
        <Button onClick={loadMore} variant='contained' className={"load-btn"}>
          Load more
        </Button>
        </div>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    getHighlightedResults();
  }, []);

  useEffect(()=>{
    console.log(selectedCategory)
    if(selectedCategory.length>0){
      handleFilters([selectedCategory], 'category');
    }
    else{
      handleFilters([], 'category');
    }
  },[selectedCategory])
  const handleFilters = (filters, filterBy) => {
    console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title='Shop page'
      description='Search and find books'
      className='container-fluid'
    >  
 {highlightedResults &&    <div style={{padding:'1rem 0rem'}}>
    <Highlight product={highlightedResults}/>
  </div>}
      <Search />
      <div className='filter-btn-container'>
        {categories.map((category)=>(
          <button onClick={()=>{
            selectedCategory===category._id ? setSelectedCategory('') : setSelectedCategory(category._id)           
          }}
          style={selectedCategory===category._id ? {background: '#5c8059', color: 'white'} : {} }
          >{category.name}</button>
        ))}
      </div>
    
      <div className='row' style={{width:'100%'}}>
        
        {/* <div className='col-md-2' style={{textAlign:'left'}}>
          <h4 className='filter-heading' onClick={()=>{setShowFilters(!showFilter)}}>Filter by Category {showFilter ?<FaChevronUp/> : <FaChevronDown/>}</h4>
         {showFilter && <ul className='filter-list'>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>}
        </div> */}
        

        <div className='col-md-12' style={{width: '100%', margin: 0, padding: 0}}>
          <div className='row'>
            {filteredResults.filter((item)=>item.inStock).map((product, i) => (
              <div key={i} className='col-xl-3 col-lg-4 col-md-12 col-sm-12'>
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Shop;
