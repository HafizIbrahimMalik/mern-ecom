import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../../environment/enviroment';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import "./Categories.scss"
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Box, Stack } from '@mui/system';
export function Categories() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: true,
    dots: false
  })
  function getProductList() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/admin/productCategories`)
      .then((response) => {
        setApiResponse(response.data)
        setSettings(prevSettings => (
          {
            ...prevSettings,
            slidesToShow: response.data.data.length < 3 ? response.data.data.length : 3
          }))
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
    <div style={{}}>

      <Box style={{ width: '50%', paddingBottom: "20px", margin: 'auto' }}>
        <h1 style={{ paddingLeft: 30 }}>Categories</h1>
        {!loadingData &&
          <Slider  {...settings}>
            {
              apiResponse.data.map((item) => {
                return <Stack className='slide' key={item._id}>

                  <Typography variant="h4">{item.name}</Typography>
                  <Typography variant="h6">{item.shortName}</Typography>
                  <Typography sx={{ maxWidth: 200, overflow: "hidden",textOverflow: "ellipsis", whiteSpace: 'nowrap' }} color="text.secondary">
                    {item.description}
                  </Typography>
                </Stack>
              })
            }
          </Slider>}
      </Box>
    </div>

  );
}
export default Categories
