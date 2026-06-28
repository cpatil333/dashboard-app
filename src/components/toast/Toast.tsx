import { useEffect } from "react";
import styles from "../../module/dashboard.module.css";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <div className={styles.toast}>✔ {message}</div>;
};

export default Toast;
