import styles from "./card.module.css"
export default function Card({cardData, stepsToWork}){
      const Icon = cardData.icon;

    return<>
    
    <div 
    className={`${styles.card}
    ${stepsToWork? styles.stepsCard :""}`}
    
    >
    {!stepsToWork && <Icon sx={{ fontSize: 40 }} color={cardData.iconColor} /> }
    {stepsToWork && <p style={{backgroundColor:cardData.stepBackgroundColor}} 
    className={styles.stepContainer}>
    <span className={styles.step} style={{color:cardData.stepColor}}>{cardData.step}</span>
    </p>}
       <h3>{cardData.title}</h3>
        <p className={styles.para}>{cardData.body}</p>
    </div>
    
    </>
}