import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../../environment/enviroment';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./Slider.scss"
import { useEffect } from 'react';
export function Slideer() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: true,
    dots: false
  };
  function getProductList() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/admin/productCategories`)
      .then((response) => {
        setApiResponse(response.data)
        setLoadingData(false)
        console.log(response.data)

      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data)
        setLoadingData(false)
      });
  }
  useEffect(() => { getProductList() }, []
  )
  return (
    <>
      <div style={{ width: '50%', margin: 'auto' }}>
        {!loadingData &&
          <Slider  {...settings}>
            {
              apiResponse.data.map((item) => {
                return <div className='slide' key={item._id}>
                  <p>{item._id}</p>
                  <h1>{item.name}</h1>
                  <h1>{item.shortName}</h1>
                  <h1>{item.description}</h1>
                </div>
              })
            }
          </Slider>}
      </div>
    </>

  );
}
export default Slideer
