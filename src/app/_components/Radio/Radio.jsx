import style from './radio.module.css'
export default  function Radio({formik}) {

    return <>   


<div className={style.roleSelection}>
  <p>Account Type</p>

   <input 
   type="radio"
   name="role"
   onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value="Provider"
    id='provider'
    /> 
  <label htmlFor='provider'> Provider (Book appointments)</label><br/><br/>

   <input 
   type="radio" 
   name="role" 
   value="Client"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    id='client'
   /> 
    <label htmlFor='client'>Client (Offer appointment slots)</label>

  {formik.errors['role']&& formik.touched['role']&&(
    <p className="error">
        {formik.errors['role']}
    </p>)
    } 
</div>

 </>
}