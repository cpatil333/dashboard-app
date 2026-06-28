import styles from "../../module/dashboard.module.css";
import type { Dashboard } from "../../types/dashboard";
import Modal from "../../components/modal/Modal";
import { useEffect, useState } from "react";

type dashboardDataType = {
  dashboardData: Dashboard[];
};

const StatsGrid = ({ dashboardData }: dashboardDataType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Dashboard | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    //add method for model close ny escape
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    
    //attche this method of window listliner
    window.addEventListener("keydown", handleKeydown);

    //clean up
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isModalOpen]);

  return (
    <div className={styles.subContainer}>
      {dashboardData.map((dash: Dashboard) => (
        <div
          className={styles.card}
          key={dash.title}
          onClick={() => {
            setSelectedCard(dash);
            setIsModalOpen(true);
          }}
        >
          <div>
            <span className={styles.cardTitle}>{dash.icon}</span>
            <span className={styles.cardTitle}>{dash.title}</span>
          </div>
          <span className={styles.cardValue}>{dash.value}</span>
          <span
            className={
              dash.trend.startsWith("+") ? styles.positive : styles.negative
            }
          >
            ({dash.trend})
          </span>
        </div>
      ))}
      {isModalOpen && selectedCard && (
        <Modal dashboard={selectedCard} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default StatsGrid;
