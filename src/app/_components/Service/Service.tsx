import CheckIcon from "@mui/icons-material/Check";
import styles from "./service.module.css"
export default function Service({serviceData}){

    return<>
    <div className='serviceContainer'>
        <div className={styles.circleIcon}>
            <CheckIcon />
        </div>
        <div className='serviceBody'>
            <h3>{serviceData.title}</h3>
            <p >{serviceData.body}</p>
        </div>
        
    </div>
    </>
}