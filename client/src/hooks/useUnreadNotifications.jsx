import { useQuery } from "@tanstack/react-query";

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notification/unread");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    refetchInterval: 5000,
  });
};
