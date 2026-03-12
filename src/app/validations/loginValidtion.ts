import * as Yup from "yup";

const validationSchema = Yup.object({
        email:Yup.string()
        .required("Email is required"),

        password:Yup.string()
        .required("Password is required")

    })

export {validationSchema};