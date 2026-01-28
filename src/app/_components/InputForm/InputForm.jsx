import Input from "../Input/Input";


export default function InputForm({input, formik }){
        const { label, type,inputType, inputName} = input;

 return <>    
        <div className='inputContainer'>         
            <label className= {'formLabel'}>
                    {label}
            </label>
            {type === "input" && <Input input={input} formik={formik} />}            
        </div>
    </>
}
