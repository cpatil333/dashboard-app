import styles from "../../module/dashboard.module.css";
import type { Dashboard } from "../../types/dashboard";

type ModalOpenTypes = {
  dashboard: Dashboard | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ dashboard, setIsModalOpen }: ModalOpenTypes) => {
  // console.log(dashboard)
  //

  return (
    <div className={styles.modal} role="dialog" aria-modal="true">
      <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
        <div>
          {dashboard?.icon} {dashboard?.title} Details
        </div>
        <hr />
        <div>
          <strong className={styles.label}>Title:</strong> {dashboard?.title}
        </div>
        <div>
          <strong className={styles.label}>Value</strong> : {dashboard?.value}
        </div>
        <div>
          <strong className={styles.label}>Trend</strong> :{" "}
          <span
            className={
              dashboard?.trend?.startsWith("+")
                ? styles.positive
                : styles.negative
            }
          >
            {dashboard?.trend}
          </span>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
