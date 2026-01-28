import style from "./button.module.css"
export default function Button({children}) {
  
    return <>
          <button className={style.button} type="submit">{children}</button>
    </>
    
  }

