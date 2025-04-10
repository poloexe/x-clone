import { useQuery } from "@tanstack/react-query";

export const useSuggestedUsers = () => {
  return useQuery({
    queryKey: ["suggested"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/suggested");
        const data = res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  });
};
