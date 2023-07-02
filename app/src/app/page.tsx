"use client"

import React, { useEffect, useRef, useState } from "react";
import { INotification, IProduct } from "./products/interfaces";
import { getCookie } from "./common/utils";
import { ENDPOINT_NOTIFICATIONS } from "./common/routes";
import api from "./common/api";
import { Banner, Footer, FooterText, Header, Hero, HeroButton, HeroButtonHover, HeroSubtitle, HeroText, HomeContent, HomeProduct, LogButton, Logo, ProductButton, ProductContent, ProductDescription, ProductImage, ProductName, ProductPrice, Products, productsWrapperBoxStyle } from "./products/styles";
import { delete_cookie } from "sfcookies";

const products = [
  {
    id: '1',
    name: 'Running Shoes',
    price: 99.99,
    description: 'Comfortable running shoes for everyday use.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOqSLhqjabPFEQ7RFkoj0xDMkibvFQfelaBA&usqp=CAU'
  },
  {
    id: '2',
    name: 'Sneakers',
    price: 79.99,
    description: 'Stylish sneakers for a casual look.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOImZ4yWRgaCfgjo5kfvj63R8TmhH6Al4kXux2-m4SrFbgqgeTdXJ6VPwIXSfb8XFPouo&usqp=CAU'
  },
  {
    id: '3',
    name: 'Flip Flops',
    price: 129.99,
    description: 'Elegant high heels for special occasions.',
    image: 'https://i.ebayimg.com/images/g/srwAAOSwDYFgBktK/s-l1200.webp'
  },
  {
    id: '4',
    name: 'Boots',
    price: 149.99,
    description: 'Sturdy boots for outdoor adventures.',
    image: 'https://www.digitalsport.com.ar/files/products/6442f8bbd29a0-547675-500x500.jpg'
  },
  {
    id: '5',
    name: 'Flip Flops Retro',
    price: 19.99,
    description: 'Casual and comfortable flip flops for the summer.',
    image: 'https://cdn.deporvillage.com/cdn-cgi/image/h=576,w=576,dpr=1,f=auto,q=75,fit=contain,background=white/product/ni-cn9677-100_002.jpg'
  },
  {
    id: '6',
    name: 'High Heels',
    price: 89.99,
    description: 'Classic High Heels for a sophisticated look.',
    image: 'data:image/jpeg;base64,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'
  },
  {
    id: '7',
    name: 'Sandals',
    price: 59.99,
    description: 'Lightweight and airy sandals for hot days.',
    image: 'https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwf3c3b877/products/NI_DX3285-126/NI_DX3285-126-1.JPG'
  },
  {
    id: '8',
    name: 'Oxfords',
    price: 109.99,
    description: 'Timeless oxfords for a formal style.',
    image: 'https://static.nike.com/a/images/t_default/32e90900-2918-4715-a6c8-c2b9eb82d172/revolution-6-running-shoes-5k6Jh6.png'
  },
];

const HomePage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(true)
  const productsList = useRef(null) as any;
  const [notification, setNotification] = useState<INotification>();

  useEffect(() => {
    if(getCookie("accessToken")){
      setIsLoggedIn(true);
    }
    getNotification()
  }, [])

  const getNotification = async () => {
    try {
      const authRes = await api.get(ENDPOINT_NOTIFICATIONS);
      if (authRes.status == 200) {
        setNotification(authRes.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleButtonHover = () => {
    setIsButtonHover(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHover(false);
  };

  const handleLogClick = () => {
    if(isLoggedIn){
      delete_cookie("accessToken");
      delete_cookie("role");
      window.location.href = "/"
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <div style={HomeContent}>
      <div style={Header}>
        <img style={Logo} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
        <button onClick={handleLogClick} style={LogButton}>{isLoggedIn? 'Logout': 'Login'}</button>
      </div>
      {notification && (
      <div style={Banner}>
        <div dangerouslySetInnerHTML={{__html: notification.text}}></div>
      </div>
      )}
      <div style={Hero}>
        <p style={HeroText}>Kings Sneakers</p>
        <p style={HeroSubtitle}>The best sneakers in the world</p>
        <button style={isButtonHover ? HeroButtonHover:HeroButton} onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={() => productsList.current.scrollIntoView({ behavior: 'smooth' }) }
          >SEE MORE</button>
      </div>
      <div style={Products} ref={productsList}>
        {products.map(prod => {
          return (
            <div style={HomeProduct} key={prod.id}> 
              <img style={ProductImage} src={prod.image} />
              <div style={ProductContent}>
                <div style={ProductDescription}>
                  <p style={ProductName}>{prod.name}</p>
                  <p style={ProductPrice}>${prod.price}</p>
                </div>
                <button style={ProductButton}> Buy </button>
              </div>
            </div>
          )
        })}
      </div>
      <div style={Footer}>
        <p style={FooterText}>Kings Sneakers © 2023</p>
      </div>
    </div>
  )
}

export default HomePage;
