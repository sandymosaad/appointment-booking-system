
import styles from "./serviceCard.module.css"

export default function ServiceCard({serviceData}){
    const Icon = serviceData.icon;
    return<>
    <div className={`${'serviceContainer'} ${styles.serviceContainerCard}`} style={{backgroundColor:serviceData.cardBackgroundColor}}>
        <div className={styles.circleIcon} style={{backgroundColor:serviceData.iconBackground}}>
            <Icon className={styles.icon} style={{color:serviceData.iconColor}}/>
        </div>
        <div className='serviceBody'>
            <h3>{serviceData.title}</h3>
            <p >{serviceData.body}</p>
        </div>      
    </div>
    </>
}