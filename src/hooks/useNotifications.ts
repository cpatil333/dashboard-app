import { useQuery } from "@tanstack/react-query";
import { fetchNotificationData } from "../api/notificationApi";

export const useNotifications = () => {
  const {
    data: notifications = [],
    isLoading: notificationsLoading,
    isError: notificationHasError,
  } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotificationData,
  });
  return {
    notifications,
    notificationsLoading,
    notificationHasError,
  };
};
