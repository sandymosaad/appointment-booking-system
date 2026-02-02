import style from "./input.module.css"

export default  function Input({input, formik}) {

    const { inputType, inputName, placeholder } = input;
    console.log(inputType)
    return <>   
            <input
                type={inputType}
                name={inputName}
                placeholder={placeholder}
                className={`${'formInput'} `}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[inputName]}
            />
    </>
}

