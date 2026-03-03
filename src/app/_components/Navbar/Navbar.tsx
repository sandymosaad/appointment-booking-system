"use client"
import style from "./navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import logo from "../../assets/appointment-logo.png"
import { supabase } from "../../lib/supabaseClient"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import {useAuth} from "../../context/AuthContext"

export default function Navbar(){
    const router = useRouter()
    const {user , setUser} = useAuth()

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        setUser(null);
        router.push("/"); 
      } catch (err: any) {
        console.error("Logout error:", err.message);
        toast.error("Error logging out");
      }
    };


    const userName = user?.user_metadata?.full_name;
    const userRole = user?.user_metadata?.role;

    return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className={style.navbarContainer} sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image src={logo} alt="logo" width={40} quality={100} />
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
              <Button variant="outlined" 
              sx={{ fontSize: 18 }}
              onClick={handleLogout}
              >
                Logout
              </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outlined" 
                sx={{ fontSize: 18 ,display: { xs: "none", md: "inline-flex" } }} >Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="contained" 
                sx={{ fontSize: 18 ,display: { xs: "none", md: "inline-flex" } }}>Get Started</Button>
              </Link>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}