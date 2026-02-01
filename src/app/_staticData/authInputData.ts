

    const inputLoginData = [
        { label: "Email Address",type:"input", inputType: "email", inputName: "email", placeholder: "you@example.com" },
        { label: "Password",type:"input", inputType: "password", inputName: "password", placeholder: "*********" },
           
    ]   

const inputSignupData = [
    { label: "Full Name", type: "input", inputType: "text", inputName: "name", placeholder: "Sandy Mosaad" },
    ...inputLoginData 
];

export interface AuthInput {
  label: string;
  type: string;
  inputType: string;
  inputName: string;
  placeholder: string;
}

export {
     inputLoginData,
     inputSignupData
 }
