// Inside HomeScreen.js

import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import Card from './Card';
import ProductDetails from '../../product details/ProductDetails';
import axios from 'axios';
import UpdateScreen from '../UpdateScreen';

const HomeScreen = () => {
  // Existing state variables
  const [activeProduct, setActiveProduct] = useState(false);
  const [updateactiveProduct, setUpdateActiveProduct] = useState(undefined);
  const [details, setDetails] = useState(null);
  const [addScreen, setAddScreen] = useState(false);
  const [cardData, setCardData] = useState(null);
  // Search Querry 
  const [searchQuery, setSearchQuery] = useState('');
  // new state 
  const [cardCount, setCardCount] = useState(0);
  const [newTitle, setNewTitle] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '',
  });




  // Fetch initial card 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        if (response.status === 200) {
          setCardData(response.data.products);
        }
      } catch (error) {
        if (error && error.response.status === 400) {
          console.error('Error fetching data:', error);
        }
      }

    };
    fetchData();
  }, []);

  // delete the card  

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${productId}`);
      console.log(response.data)
      if (response.status === 200) {
        setCardData((prevCardData) => prevCardData.filter(product => product.id !== productId));
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  // Update the card data
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${productId}`, updatedData);
      if (response.status === 200) {
        console.log('Updated Data');
        console.log(response.data);
        setCardData((prevCardData) =>
          prevCardData.map((product) =>
            product.id === productId ? { ...product, ...updatedData } : product
          )
        );
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
    } finally {
      setUpdateActiveProduct(undefined);
    }
  };


  // Search querry 

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`, {
          // const abort= new AbortController : 
          signal:abortController.signal
        });
        if (response.status === 200) {
          console.log(response.data.products);
          setCardData(response.data.products);
        }
      } catch (error) {
        if (error && error.response && error.response.status === 400) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData()
    return ()=>{
      abortController.abort()
    }
  }, [searchQuery]);





  // Existing event handler for live preview
  const handleLive = (product) => {
    setActiveProduct(true);
    setDetails(product.id);
    console.log(product.id);
  }

  // Existing event handler to go back to home page
  const homePage = () => {
    setActiveProduct(false);
  }

  // Event handler for input field change
  const handleTitleChange = (e) => {
    const { value, name } = e.target;
    setNewTitle({ ...newTitle, [name]: value });
  }

  // Event handler for adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();





    // Create a new card object with the entered details
    const newCard = {
      title: newTitle.title,
      description: newTitle.description,
      price: (newTitle.price),
      discountPercentage: (newTitle.discountPercentage),
      rating: (newTitle.rating),
      stock: (newTitle.stock),
      brand: newTitle.brand,
      category: newTitle.category,
      thumbnail: newTitle.thumbnail,
    };

    try {
      const response = await axios.post('https://dummyjson.com/products/add', newCard);
      if (response.status === 200) {
        setCardData((prevCardData) => [newCard, ...prevCardData]);
        setAddScreen(false);
        console.log(newCard);
        console.log(response.status)
      }
    } catch (error) {
      console.error('Error adding product:', error.message)
    } finally {
      setAddScreen(false);
    }

  };

  return (
    <div className="center">
      {updateactiveProduct === undefined ?
        <>
          <button className='butn' onClick={() => setAddScreen(true)}>
            Add New Product
          </button>
          {addScreen ? (
            <form>
              <label>
                Title: <input
                  className='input-field'
                  name="title"
                  type="text"
                  placeholder='Add an title'
                  value={newTitle.title}
                  onChange={handleTitleChange} />
              </label>
              <label>
                description: <input
                  className='input-field'
                  name="description"
                  type="text"
                  placeholder='Add an description'
                  value={newTitle.description}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />
              <label>
                price: <input
                  className='input-field'
                  name="price"
                  type="text"
                  placeholder='Add an price'
                  value={newTitle.price}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />
              <label>
                discountPercentage: <input
                  className='input-field'
                  name="discountPercentage"
                  type="text"
                  placeholder='Add a discountPercentage'
                  value={newTitle.discountPercentage}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />
              <label>
                rating: <input
                  className='input-field'
                  name="rating"
                  type="text"
                  placeholder='Add a rating'
                  value={newTitle.rating}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />
              <label>
                stock: <input
                  className='input-field'
                  name="stock"
                  type="text"
                  placeholder='Add a stock'
                  value={newTitle.stock}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />

              <label>
                thumbnail: <input
                  className='input-field'
                  name="thumbnail"
                  type="text"
                  placeholder='Add a thumbnail'
                  value={newTitle.thumbnail}
                  onChange={handleTitleChange} />
              </label>
              <br /> <br />
              <button className='add-btn' onClick={handleAddProduct}>Confirm  Add ➕</button>
            </form>
          ) : !activeProduct ? (
            !cardData ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className='Search'>
                  <label>
                    Search Category:
                    <input
                      className='input-field'
                      type="text"
                      placeholder='Search by category...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </label>
                </div>
                {cardData.map((product, index) => (
                  <Card
                    key={index}
                    productData={product}
                    liveDetails={() => handleLive(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                    onUpdate={() => setUpdateActiveProduct(product)}
                  />
                ))}

              </>
            )
          ) : (
            <ProductDetails product={details} homePage={() => homePage()} />
          )}</> :
        <UpdateScreen
          productData={updateactiveProduct}
          onUpdate={handleUpdateProduct} // Pass the correct function
        />}
    </div>
  );
};

export default HomeScreen;
