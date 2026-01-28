import style from './radio.module.css'
export default  function Radio({formik}) {

    return <>   


<div class={style.roleSelection}>
  <p>Account Type</p>

   <input 
   type="radio"
   name="user_role"
   onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value="Provider"/> 
  <label> Provider (Book appointments)</label><br/><br/>

   <input 
   type="radio" 
   name="user_role" 
   value="Client"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
   /> 
    <label>Client (Offer appointment slots)</label>
</div>

 </>
}