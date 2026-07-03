import styles from "./SkeletonCard.module.css";
const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}></div>
      <div className={styles.line}></div>
      <div className={styles.lineSmall}></div>
    </div>
  );
};

export default SkeletonCard;
