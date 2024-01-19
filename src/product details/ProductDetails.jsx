// ProductDetails.js
import React, { useEffect, useState } from 'react';
import './Details.css';
import Rating from 'react-rating';
import Images from '../assets/images';
import axios from 'axios';


const ProductDetails = ({ product, homePage }) => {
    const [mainImage, setMainImage] = useState(null);
    // const [smallImages, setSmallImages] = useState([]);



    const [singleData, setSingleData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${product}`);
                if (response.status === 200) {
                    setSingleData(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error handling:', error.message)
            }

        };
        fetchData();
    }, []);

    const handleSmallImageClick = (imageSrc) => {
        setMainImage(imageSrc);
    };




    const roundedDiscountedPrice = Math.round(singleData?.price - (singleData?.price * singleData?.discountPercentage / 100));




    return (
        <div>
            {
                !singleData ? <div>Loading...</div> :
                    <>
                        <div className='back-btn'>
                            <button onClick={homePage} className='back'> <img src={Images.arrow} alt="" /></button>
                        </div>


                        <div id="prodetails" className="section-p1">
                            <div className="thumbnail">
                                <img src={mainImage || singleData?.thumbnail} width="100%" height={300} id="MainImg" alt="" />

                                <div className="small-img-group">
                                    {singleData.images.map((smallImage, index) => (
                                        <div className="small-img-col" key={index} onClick={() => handleSmallImageClick(smallImage)}>
                                            <img src={smallImage} width="100%" height="100%" alt="" />
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="details">
                                <div className='title'>
                                    <p>{singleData.title}</p>
                                </div>
                                <div className='description'>
                                    <p>{singleData.description}</p>
                                </div>

                                <div className='pric'>
                                    <span className='lin'>{`$${singleData.price}`}</span>
                                    <span className='dicount'>{`$${roundedDiscountedPrice}`}</span>
                                </div>

                                <Rating
                                    readonly={true}
                                    initialRating={singleData.rating}
                                    emptySymbol={<img className='star' src={Images.emptyStar} />}
                                    fullSymbol={<img className='star' src={Images.fullStar} />}
                                />



                                <p><span className='color'>Stock:</span> <span>{singleData.stock}</span></p>
                                <p> <span className='color'>Brand:</span> <span> {singleData.brand}</span></p>
                                <p><span className='color'>Categories: </span><span>{singleData.category}</span></p>


                                <div className='input-cart'>
                                    <input type="number" />
                                    <button className='btn'>Add to Cart</button>
                                </div>



                            </div>

                        </div>


                    </>
            }

        </div>

    );
}

export default ProductDetails;
