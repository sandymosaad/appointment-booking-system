
"use client"
import { useState } from 'react';
import { useFormik, FormikProps } from "formik";
import { inputSignupData } from '../_staticData/authInputData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { addUser } from '../lib/data-service';
import {SignUpValues} from "../interfacees/signupValues"
import { validationSchema } from '../validations/signupValidtion';
import { Button } from "@mui/material";
import {Container,Paper,Box,Typography,TextField,Alert,Link as
MuiLink,RadioGroup,FormControlLabel,Radio,FormLabel} from "@mui/material";

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
         <Container maxWidth="sm">
            <Paper elevation={4} sx={{ p: 5, mt: 8, borderRadius: 3}}>
                <Box
                component="form"
                onSubmit={formik.handleSubmit}
                display="flex"
                flexDirection="column"
                gap={3}
                >
                <Typography variant="h4" fontWeight="bold">
                    Sign Up
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{fontSize:'1.5rem'}}>
                    Create a new account
                </Typography>

                {inputSignupData.map((input) => (
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
                                fontSize: "1.8rem",
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

                <Box>
                    <FormLabel>Role</FormLabel>
                    <RadioGroup
                    row
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    >
                    <FormControlLabel
                        value="Provider"
                        control={<Radio />}
                        label="Provider"
                    />
                    <FormControlLabel
                        value="Client"
                        control={<Radio />}
                        label="Client"
                    />
                    </RadioGroup>
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ fontSize: 18, mt: 2 }}
                >
                    Sign Up
                </Button>

                {error && <Alert severity="error" sx={{fontSize:"1.3rem"}}>{error}</Alert>}

                <Typography textAlign="center" variant="body2" sx={{fontSize:'1.5rem'}}>
                    Already have an account?{" "}
                    <MuiLink component={Link} href="/login" underline="hover">
                    Sign In
                    </MuiLink>
                </Typography>
                </Box>
            </Paper>
        </Container>
    );
}