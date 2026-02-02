"use client"
import style from "./navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import logo from "../../assets/logo.png"
import { Button } from '@mui/material';
export default function Navbar(){
return <>
    <div className={style.navbarContainer}>
        <nav className={style.nav}>

        <div className={style.brand}>
            <Link className={style.navBrandLink} href="/">
            <Image src={logo} alt="logo" className={style.logo} width={70} quality={100} />
            <h3>AppointmentHub</h3>
            </Link>
        </div>

            <div className={style.navbarButtons}>
                <Button variant="outlined" sx={{ fontSize: 18 }}> Login</Button>
                <Button variant="contained" sx={{ fontSize: 18 }}>Get Started</Button>
            </div>
        </nav>
    </div>



    </>
}