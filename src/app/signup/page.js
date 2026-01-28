"use client"
import { Password } from '@mui/icons-material';
import {inputAuthData} from '../_staticData/authInputData';
import {useFormik} from "formik";
import * as Yup from "yup";
import InputForm from "../_components/InputForm/InputForm"
import Radio from '../_components/Radio/Radio';
import Button from '../_components/Button/Button';
export default function SignUp(){

    const validationSchema = Yup.object({
        name:Yup.string('Name should be string')
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

        email:Yup.string()
        .required("Email is required")
        .email("Invalid email format"),

        password:Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),

        rePassword:Yup.string() 
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    })

        const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
        },
        validationSchema,
        // onSubmit:submitRegister,
    })

    return<>
    
        logout
        <div className='form'>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Sign Up</h2>
                    <p>Create a new account</p>
                   {inputAuthData.map((input)=><InputForm key={input.inputName} input={input} formik={formik} />)}
                   <Radio formik={formik} />
                </form>
                <Button>Sign Up</Button>
        </div>
    
    </>
}