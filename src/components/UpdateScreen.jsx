// UpdateScreen.js
import React, { useState } from 'react';

const UpdateScreen = ({ productData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(productData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(productData.id, updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            className='input-field'
            name="title"
            type="text"
            placeholder='Add a title'
            value={updatedData.title}
            onChange={handleInputChange}
          />
        </label>
        <br /> <br />
        <label>
          description:
          <input
            className='input-field'
            name="description"
            type="text"
            placeholder='Add a description'
            value={updatedData.description}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />
        <label>
          price:
          <input
            className='input-field'
            name="price"
            type="text"
            placeholder='Add a price'
            value={updatedData.price}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />
        <label>
          discountPercentage:
          <input
            className='input-field'
            name="discountPercentage"
            type="text"
            placeholder='Add a discountPercentage'
            value={updatedData.discountPercentage}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />
        <label>
          rating:
          <input
            className='input-field'
            name="rating"
            type="text"
            placeholder='Add a rating'
            value={updatedData.rating}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />

        <label>
          stock:
          <input
            className='input-field'
            name="stock"
            type="text"
            placeholder='Add a stock'
            value={updatedData.stock}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />
        <label>
          thumbnail:
          <input
            className='input-field'
            name="thumbnail"
            type="text"
            placeholder='Add a thumbnail'
            value={updatedData.thumbnail}
            onChange={handleInputChange}

          />
        </label>
        <br /> <br />

        <button type="submit" className='update-btn'>Confirm Update</button>
      </form>
    </div>
  );
};

export default UpdateScreen;
