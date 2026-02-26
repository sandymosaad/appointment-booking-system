"use client"
import style from "./navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import logo from "../../assets/logo.png"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";


export default function Navbar(){
    const [userName, setUserName]=useState("")
    const [userRole, setUserRole]=useState("")

    useEffect(()=>{
        supabase.auth.getSession().then(({data})=>{
            if(data.session.user){
                setUserName(data.session.user.user_metadata.full_name);
                setUserRole(data.session.user.user_metadata.role)

            }
        })

    },[userName])

    return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className={style.navbarContainer} sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image src={logo} alt="logo" width={70} quality={100} />
            {!userName && <Typography variant="h6" sx={{ ml: 1 }}>AppointmentHub</Typography>}
          </Link>

          {userName && (
            <Box>
              <Link href={`${userRole.toLowerCase()}-dashboard`} style={{color:"black",textDecoration: "none" }}>
              <Typography variant="h5">{userRole} Dashboard</Typography>
              <Typography variant="body2" sx={{fontSize:"1.5rem"}}>Welcome, {userName}</Typography>
              </Link>  
              
            </Box>
          )}
        </Box>

        <Box display="flex" gap={2}>
          {userName ? (
            <Link href="/">
              <Button variant="outlined" sx={{ fontSize: 18 }}>Logout</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outlined" sx={{ fontSize: 18 }}>Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="contained" sx={{ fontSize: 18 }}>Get Started</Button>
              </Link>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}