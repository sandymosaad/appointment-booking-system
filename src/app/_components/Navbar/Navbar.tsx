"use client"
import style from "./navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import logo from "../../assets/logo.png"
import { Button } from '@mui/material';
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"


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

    return <>
        <div className={style.navbarContainer}>
            <nav className={style.nav}>
            <div className={style.brand}>
                {userName? 
                <div>
                    <h3>{userRole} Dashboard</h3>
                    <p>Welcome, {userName}</p>
                </div>
                :
                <Link className={style.navBrandLink} href="/">
                <Image src={logo} alt="logo" className={style.logo} width={70} quality={100} />
                <h3>AppointmentHub</h3>
                </Link>
                 }

            </div>

            <div className={style.navbarButtons}>
                {userName?          
                    <Link href="/">
                        <Button variant="outlined" sx={{ fontSize: 18 }}> Logout</Button>
                    </Link>
                :<>
                    <Link href="/login">
                        <Button variant="outlined" sx={{ fontSize: 18 }}> Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="contained" sx={{ fontSize: 18 }}>Get Started</Button>
                    </Link>
                </>
                }
            </div>
                

            </nav>
        </div>



        </>
}