
"use client"
import { useState } from 'react';
import { useFormik, FormikProps } from "formik";
import { inputSignupData, AuthInput } from '../_staticData/authInputData';
import InputForm from "../_components/InputForm/InputForm";
import Radio from '../_components/Radio/Radio';
import Button from '../_components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { addUser } from '../lib/data-service';
import style from "../auth.module.css"
import {SignUpValues} from "../interfacees/signupValues"
import { validationSchema } from '../validations/signupValidtion';
export default function SignUp() {
    const router = useRouter();
    const [error , setError]=useState("")

    async function submitRegister(values: SignUpValues) {
        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    full_name: values.name,
                    role: values.role, 
                },
            },
        });

        if (error) {
            //console.log("Auth Error:", error.message);
            setError(error.message); 
            return;
        }

        const user = data.user;
        if (user) {
            try {
                await addUser({
                    id: user.id, 
                    name: values.name,
                    email: values.email,
                    role: values.role,
                    password: values.password
                });
            //console.log(values)
               //console.log("Profile created successfully");
                router.push('/login');
            } catch (err) {
                console.log("Profile creation failed:", err);
            }
        }
    }

    const formik: FormikProps<SignUpValues> = useFormik<SignUpValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "" 
        },
        validationSchema,
        onSubmit: submitRegister,
    });

    return (
        <div className='form'>
            <form onSubmit={formik.handleSubmit}>
                <h2>Sign Up</h2>
                <p>Create a new account</p>
                {inputSignupData.map((input: AuthInput) => (
                    <InputForm key={input.inputName} input={input} formik={formik} />
                ))}
                <Radio formik={formik} />
                <Button >Sign Up</Button>
            </form>
            
            {error&& <p className='error'>{error}</p>}
            <p className={style.navigationPara }>Already have an account? <Link href="/login" className={style.navigationLink }>Sign In</Link></p>
        </div>  
    );
}