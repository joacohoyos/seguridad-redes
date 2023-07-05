"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { INotification } from "../products/interfaces";
import api from "../common/api";
import { ENDPOINT_NOTIFICATIONS } from "../common/routes";
import { Header, LogButton, Logo, NavigationBar } from "../products/styles";
import { getCookie } from "cookies-next";
import { Typography } from "@mui/material";
import { titleStyle } from "../common/styles";
import { delete_cookie } from "sfcookies";
import { ADMIN_ROUTES, IRoute } from "../sellers/interfaces";

const NotificationPage = () => {
    const [notification, setNotification] = useState<INotification | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationEditing, setNotificationEditing] = useState('')
  const [routes, setRoutes] = useState<IRoute[]>(ADMIN_ROUTES)

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

      const handleSave = () => {
        api.post(ENDPOINT_NOTIFICATIONS, {
          text: notificationEditing
        }).then(res => {
          if(res.status == 200){
            setNotificationEditing('')
          }
        })
      }

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: '100vh',
          }}>
                <div style={Header}>
                    <img style={Logo} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
                    <button onClick={handleLogClick} style={LogButton}>{isLoggedIn? 'Logout': 'Login'}</button>
                </div>
                <div style={NavigationBar}>
        {routes.map((route) => {
          return <div onClick={() => window.location.href = route.path}>
            {route.name}
            </div>
        })}
      </div>
                <Typography sx={{...titleStyle, color: 'black'}}>Notificacion de la pagina principal</Typography> 
                {notification && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                <input type="text" placeholder="Notificacion a mostrar en la Home page" defaultValue={notification.text} onChange={(event: ChangeEvent<HTMLInputElement>) => setNotificationEditing(event.target.value)} style={{width: '50%', margin: 'auto', marginTop: '20px'}}/>
                <button onClick={handleSave} style={{...LogButton, width: 200, margin: 'auto'}}>Editar notificacion</button>
                </div>
                )}
            </div>
    )
}

export default NotificationPage;