"use client"

import React, { useState } from "react";
import { AccountCircle, Box, Button, InputAdornment, KeyIcon, Modal, TextField, Typography } from "../common/components/materialUI";
import { appTitleTextStyle, forgorYourPasswordTextStyle, loginBox, modalBoxStyle } from "./styles";
import { fullWidthBoxStyle, layoutBoxStyle, themedButtonStyle } from "../common/styles";
import api from "../common/api";
import { ENDPOINT_AUTH, endpointChangePassword } from "../common/routes";
import Loader from "../common/components/Loader";
import { setCookie } from "cookies-next";
import { EUserRole } from "../common/utils";
import { useRouter } from "next/navigation";
import { Header, Logo } from "../products/styles";
const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const [open, setOpen] = React.useState(false);
  const [sentNewPassword, setSentNewPassword] = useState(false);
  const [recoverPassEmail, setRecoverPassEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async () => {

    setIsLoading(true);
    try {
      const authRes = await api.post(ENDPOINT_AUTH, {
        email,
        password, 
      });

      if (authRes.status === 201) {

        setCookie("accessToken", authRes.data.accessToken);
        if(authRes.data.isAdmin) {
          setCookie("role", EUserRole[2])
          router.push('/notifications');
        } else {
          setCookie("role", EUserRole[authRes.data.role]);
          if(authRes.data.role === EUserRole.USER) {
            router.push('/');
          } else {
            router.push('/products');
          }
        }
      }

    } catch (e: any) {
      console.log(e);
    }
    setIsLoading(false);
  }

  const handleClickForgotPassword = () => {
    setOpen(true);
  }

  const handleChangePassword = async () => {

    const authRes = await api.put(endpointChangePassword(recoverPassEmail), {
      password_to_confirm: newPassword
    });

    if (authRes.status === 200) {
      setSentNewPassword(true);
    }

  }

  const handleClose = () => {
    setRecoverPassEmail("");
    setNewPassword("");
    setSentNewPassword(false);
    setOpen(false);
  }

  return (
    <Box sx={layoutBoxStyle}>
      <Box sx={loginBox}>
        <Box width="100%">
        <div style={Header}>
        <img style={{...Logo, margin: 'auto', paddingTop: '10px'}} src='https://seeklogo.com/images/K/kings-sneakers-logo-5B97CC79A1-seeklogo.com.png' />
      </div>
          <Typography>Email</Typography>
          <TextField
            id="email"
            fullWidth
            variant="outlined" 
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography>Password</Typography>
          <TextField
            type="password"
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography 
            sx={forgorYourPasswordTextStyle}
            onClick={handleClickForgotPassword}
          >
            Forgot your password?
          </Typography>
          <Box sx={{...fullWidthBoxStyle, marginY: 1 }}>
            {
              isLoading ? (
                <Loader size="small" />
              ) : (
                <Button
                  sx={{ 
                    ...themedButtonStyle,
                    width: "40%",
                  }} 
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )
            }
          </Box>
        </Box>
      </Box>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography style={{color: 'black'}} variant="h6" component="h2" marginBottom={1}>
            Change your password
          </Typography>
          {
            sentNewPassword ? (
              <Box>
                <Typography style={{color: 'black'}}>
                  If the email is registered, you will get a confirmation message shortly.
                </Typography>
                <Box sx={fullWidthBoxStyle}>
                  <Button
                    sx={{ 
                      ...themedButtonStyle,
                      width: "20%",
                    }}
                    variant="contained"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography style={{color: 'black'}}>Email</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 2 }}
                  onChange={(e) => setRecoverPassEmail(e.target.value)}
                />
                <Typography style={{color: 'black'}}>New password</Typography>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: 1 }}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Box sx={fullWidthBoxStyle}>
                  <Button
                    sx={{ 
                      ...themedButtonStyle,
                      width: "20%",
                    }}
                    disabled={newPassword === "" || recoverPassEmail === ""}
                    variant="contained"
                    onClick={handleChangePassword}
                  >
                    Change
                  </Button>
                </Box>
              </>
            )
          }
        </Box>
      </Modal>
    </Box>
  )
}

export default LoginPage;
