"use client"
import { useFormik, FormikProps } from "formik";
import { inputLoginData, AuthInput } from '../_staticData/authInputData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import {LoginFormValues} from "../interfacees/loginValues"
import { validationSchema } from '../validations/loginValidtion';

import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert
} from "@mui/material";

export default function Login() {
      const [error , setError]=useState("");
      const router = useRouter()


  async function submitLogin(values: LoginFormValues){
    const {data, error}=await supabase.auth.signInWithPassword({
      email:values.email,
      password:values.password
    })
    if(error){
          setError(error.message);
          return;
      }
    if(data.user.user_metadata.role ==="Provider"){
        router.push('/provider-dashboard')
    }else if (data.user.user_metadata.role === "Client")
    router.push('/client-dashboard') 
  }
  const formik: FormikProps<LoginFormValues> = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
  <Container maxWidth="sm">
    <Paper elevation={4} sx={{ p: 5, mt: 8, borderRadius: 3 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Login
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{fontSize:'1.5rem'}}>
          Sign in to your account
        </Typography>

        {inputLoginData.map((input) => (
            <TextField
                key={input.inputName}
                fullWidth
                label={input.label}
                name={input.inputName}
                type={input.inputType}
                placeholder={input.placeholder}
                value={formik.values[input.inputName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                formik.touched[input.inputName] &&
                Boolean(formik.errors[input.inputName])
                }
                helperText={
                formik.touched[input.inputName] &&
                formik.errors[input.inputName]
                }
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "1.4rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.2rem",
                  },  
                  "& .MuiFormHelperText-root": {
                  fontSize: "1.3rem",
                  }
                }}
            />
        ))}

        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ fontSize: 18, mt: 2 }}
        >
          Login
        </Button>

        {error && <Alert severity="error" sx={{fontSize:"1.3rem"}}>Missing email or password</Alert>}

        <Typography textAlign="center" variant="body2" sx={{fontSize:'1.5rem'}}>
          Don't have an account?{" "}
          <MuiLink component={Link} href="/signup" underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Paper>
  </Container>
  );
}