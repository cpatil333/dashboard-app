import { useEffect, useState } from "react";
import { type Notification } from "../types/notification";
import notification from "../data/notification.json";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationHasError, setNotificationHasError] = useState(false);

  const notificationData = notification;

  useEffect(() => {
    try {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < notificationData.length) {
          setNotifications((prev) => [...prev, notificationData[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setNotificationsLoading(false);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } catch (error: unknown) {
      setNotificationHasError(true);
      setNotificationsLoading(false);
    }
  }, [notificationData]);

  return { notifications, notificationsLoading, notificationHasError };
};
