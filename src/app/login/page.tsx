"use client"
import React from 'react';
import { useFormik, FormikProps } from "formik";
import { inputLoginData, AuthInput } from '../_staticData/authInputData';
import InputForm from "../_components/InputForm/InputForm";
import Button from '../_components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import style from "../auth.module.css"
import {LoginFormValues} from "../interfacees/loginValues"


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
    console.log("User signed in successfully:", data);
    if(data.user.user_metadata.role ==="Provider"){
        router.push('/provider-dashboard')
    }else if (data.user.user_metadata.role === "Client")
    router.push('/client-dashboard ') 
  }
  const formik: FormikProps<LoginFormValues> = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitLogin,
  });

  return (
    <div className='form'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <p>Sign in to your account</p>
        
        {inputLoginData.map((input: AuthInput) => (
          <InputForm 
            key={input.inputName} 
            input={input} 
            formik={formik} 
          />
        ))}

        <Button >Login</Button>
      </form>

      {error&&<p className='error'>{error}</p>}
      <p className={style.navigationPara}>
        Don't have an account? <Link href="/signup" className={style.navigationLink}>Sign up</Link>
      </p>
    </div>
  );
}