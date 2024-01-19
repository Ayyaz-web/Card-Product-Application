import React, { useState } from 'react';
import Rating from 'react-rating';
import Images from '../../assets/images';
import './HomeScreen.css';

const Card = ({ productData, liveDetails, onDelete, onUpdate}) => {

  const [isActive, setIsActive] = useState("#000000");

  const roundedDiscountedPrice = Math.round(
    productData.price - (productData.price * productData.discountPercentage) / 100
  );
  const handleDelete = () => {
    onDelete();
    console.log('deleted successfully')
  };
  const handleUpdate = () => {
    onUpdate(productData.id, updatedData);
  };




  return (
    <>


      <div className='container'>
        <img
          src={productData.thumbnail}
          alt="Card Image"
          height={200}
        />
        <div className='details'>
          <h2>{productData.title}</h2>
          <p>{productData.description}</p>

          <p className='price'>
            <span className='line'>{`$${productData.price}`}</span>
            <span>{`$${roundedDiscountedPrice}`}</span>

          </p>
          <div className="icon-btn">
            <div className='Rate-stock'>
              <Rating
                readonly={true}
                initialRating={productData.rating}
                emptySymbol={<img className='star' src={Images.emptyStar} />}
                fullSymbol={<img className='star' src={Images.fullStar} />}
              />
              <p>Stock: {productData.stock}</p>

            </div>
            <button className='btn' onClick={onUpdate} > Update  </button>



            <button className='cart' onClick={handleDelete}>
              Delete
            </button>




            <div className='cart-btn'>

              <button
                onMouseOver={() => setIsActive("#FFFFFF")}
                onMouseLeave={() => setIsActive("#000000")}
                className='cart'
              >
                <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill={isActive} d="M6 13h9c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1V4H2c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v2h13l-4 7H6zm-.5 3c.83 0 1.5.67 1.5 1.5S6.33 19 5.5 19S4 18.33 4 17.5S4.67 16 5.5 16m9 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5" />
                </svg>
              </button>
              <button className='btn' onClick={liveDetails} >Live Preview</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Card;
