import notification from "../data/notification.json";
import { type Notification } from "../types/notification";

export const fetchNotificationData = async (): Promise<Notification[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return notification;
};
