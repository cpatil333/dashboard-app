import { useState, useEffect } from "react";
import type { Notification } from "../../../types/notification";
import styles from "../../../module/dashboard.module.css";

type notificationsTypes = {
  notifications: Notification[];
  loading: boolean;
  hasError: boolean;
};

const NotificationItem = ({
  notifications,
  loading,
  hasError,
}: notificationsTypes) => {
  const [noticeData, setNoticeData] = useState<Notification[]>([]);

  useEffect(() => {
    setNoticeData(notifications);
  }, [notifications]);

  if (loading) return <p>Loading notification...</p>;
  if (hasError) return <p>Unable to load notification data.</p>;

  console.log(noticeData);
  const handleIsRead = (id: number) => {
    setNoticeData((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    );
  };

  return (
    <div>
      <span className={styles.notificationHeader}>
        🔔 Notifications ({noticeData.length})
      </span>
      <div className={styles.subContainer}>
        {noticeData.map((notificate: Notification) => (
          <div className={styles.card} key={notificate.id}>
            <div className={styles.markReaddiv}>
              <div>
                <span className={styles.cardTitle}>{notificate.icon}</span>
                <span className={styles.cardValue}>{notificate.message}</span>
              </div>
              <div>
                <a
                  className={styles.markreadLink}
                  onClick={() => handleIsRead(notificate.id)}
                >
                  {notificate.isRead ? "[Read]" : "[Mark as Read]"}
                </a>
              </div>
            </div>
            <span className={styles.cardTitle}>{notificate.time} sec</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationItem;
