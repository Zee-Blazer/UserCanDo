import { useGetNotificationsQuery, useUpdateNotificationStatusMutation } from '@/queries/generalApi';
import { useMemo } from 'react';

interface UseNotificationsOptions {
  page?: number;
  pageSize?: number;
  status?: "delivered" | "seen";
  autoRefetch?: boolean;
}

export const useNotifications = (options: UseNotificationsOptions = {}) => {
  const {
    page = 1,
    pageSize = 50,
    status,
    autoRefetch = true
  } = options;

  const queryParams = {
    page,
    page_size: pageSize,
    ...(status && { status })
  };

  const {
    data: notificationsData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetNotificationsQuery(queryParams, {
    pollingInterval: autoRefetch ? 30000 : undefined, // Poll every 30 seconds if autoRefetch is true
  });

  const [updateNotificationStatus, { isLoading: isUpdating }] = useUpdateNotificationStatusMutation();

  const notifications = useMemo(() => {
    return notificationsData?.payload || [];
  }, [notificationsData]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter(n => n.status === "delivered");
  }, [notifications]);

  const readNotifications = useMemo(() => {
    return notifications.filter(n => n.status === "seen");
  }, [notifications]);

  const unreadCount = unreadNotifications.length;
  const totalCount = notificationsData?.count || 0;

    const markAsRead = async (notificationIds: string[]) => {
    if (!notificationIds.length) {
      return { success: true };
    }

    try {
      
      const result = await updateNotificationStatus({
        notification_ids: notificationIds,
        status: "seen"
      }).unwrap();
      
      // Refetch to get updated data
      refetch();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const markAllAsRead = async () => {
    if (unreadNotifications.length === 0) return { success: true };
    
    const unreadIds = unreadNotifications.map(n => n.id);
    return markAsRead(unreadIds);
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  return {
    notifications,
    unreadNotifications,
    readNotifications,
    unreadCount,
    totalCount,
    isLoading,
    isError,
    isUpdating,
    error,
    markAsRead,
    markAllAsRead,
    formatTime,
    refetch,
    pagination: {
      page: notificationsData?.page || 1,
      totalPages: notificationsData?.total_pages || 1,
      hasNext: notificationsData?.has_next || false,
      hasPrevious: notificationsData?.has_previous || false,
      itemsPerPage: notificationsData?.items_per_page || pageSize
    }
  };
};

export default useNotifications;