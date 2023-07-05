"use client"

import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Divider, Typography } from "../common/components/materialUI";
import { contentBoxStyle, fullWidthBoxStyle, titleStyle } from "../common/styles";
import { IProduct } from "./interfaces";
import Loader from "../common/components/Loader";
import { EUserRole, getCookie } from "../common/utils";
import api from "../common/api";
import { ENDPOINT_PRODUCTS, endpointPutProductDescription } from "../common/routes";
import {
  Footer,
  FooterText,
  Header,
  HomeProduct,
  LogButton,
  Logo,
  ProductDescriptionEdit,
  ProductDescription,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductsList,
  NavigationBar
} from "../products/styles";
import { delete_cookie } from "sfcookies";
import EditIcon from '@mui/icons-material/Edit';
import { ADMIN_ROUTES, IRoute, SELLER_ROUTES } from "../sellers/interfaces";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSeller, setIsUserSeller] = useState(false);
  const [products, setProducts] = useState<IProduct[]>();
  const [productEditing, setProductEditing] = useState('-1')
  const [newProductName, setNewProductName] = useState('')
  const [routes, setRoutes] = useState<IRoute[]>([])

  useEffect(() => {
    const isLogged = getCookie('accessToken')
    const isSeller = getCookie("role") == EUserRole[0];
    const isAdmin = getCookie('role') == EUserRole[2]

    if(!isLogged) {
      window.location.href = "/login"
    }

    if (isSeller) {
     setIsUserSeller(isSeller);
     getProducts()
     setRoutes(SELLER_ROUTES)
    }

    if(isAdmin) {
      setRoutes(ADMIN_ROUTES)
      getProducts()
    }

  }, []);

  const getProducts = async () => {
    setIsLoading(true)
    try {
      const authRes = await api.get(ENDPOINT_PRODUCTS, {
        headers: {
          'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
        }
      });

      if(authRes.status == 200)
      {
        setProducts(authRes.data)
      }

    } catch (e : any){
      console.error(e)
    }
    setIsLoading(false)
  }

  const editProduct = async (prodId: string, name: string) => { 
    try {
        setIsLoading(true)
        await api.put(endpointPutProductDescription(prodId), {
            description: name
          },{
            headers: {
              'Authorization': 'Bearer ' + getCookie("accessToken")?.replaceAll('"', '')
            }
          });
          setTimeout(async () => {
            await getProducts()
            setNewProductName('')
            setProductEditing('-1') 
            setIsLoading(false) 
          }, 1500);      
      } catch (e : any){
        console.error(e)
        setIsLoading(false)
      }
  }

  const handleLogClick = () => {
      delete_cookie("accessToken");
      delete_cookie("role");
      window.location.href = "/"
  }

  const handleEditClick = (prodId: string) => {
    setProductEditing(prodId)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
        if(productEditing !== '-1') {
            editProduct(productEditing, newProductName)
        }
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={Header}>
        <img style={Logo} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
        <button onClick={handleLogClick} style={LogButton}>{'Logout'}</button>
      </div>
      <div style={NavigationBar}>
        {routes.map((route) => {
          return <div onClick={() => window.location.href = route.path}>
            {route.name}
            </div>
        })}
      </div>
      <Box sx={{...contentBoxStyle, minHeight: 'calc(100vh - 63px - 85px)'}}>
        {
          isUserSeller && !isLoading ? (
            <>
              <Typography sx={{...titleStyle, color: 'black'}}>Mis productos</Typography> 
              <Divider />
              <div style={ProductsList}>
                {Array.isArray(products) && products.map((prod) => (
                    <div style={HomeProduct} key={prod.id}> 
                      <img style={ProductImage} src={prod.image} />
                      <p style={ProductName}>{prod.name}</p>
                      <p style={ProductPrice}>${prod.price}</p>
                      <div style={ProductDescriptionEdit}>
                      <EditIcon onClick={() => handleEditClick(prod.id)} style={{fill: 'black', cursor: 'pointer', position: 'absolute', right: 0, top: -55}}/>
                        {productEditing !== prod.id ? (
                        <p style={ProductDescription}>{prod.description}</p>
                        ) : <input type="text" defaultValue={prod.description} onChange={(event:ChangeEvent<HTMLInputElement>) => setNewProductName(event.target.value)} onKeyDown={handleKeyDown}/>}
                      </div>
                    </div>
                ))}
                </div>             
            </>
          ) : isLoading ? (
            <Loader />
          ) : (
            <Box sx={{...fullWidthBoxStyle, height: "100%" }}>
              <Typography style={{color: 'black',
  fontFamily: 'Lato, sans-serif',
  fontSize: '25px',}} fontWeight={500}>Usted no tiene acceso a esta sección.</Typography>
            </Box>
          )
        }
      </Box>
      <div style={Footer}>
        <p style={FooterText}>Kings Sneakers © 2023</p>
      </div>
    </div>
  )
}

export default ProductsPage;
