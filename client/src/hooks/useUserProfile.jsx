import { useQuery } from "@tanstack/react-query";

export const useUserProfile = ({ username }) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/user/profile/${username}`);
        const data = await res.json();

        console.log(res);
        console.log(data);

        if (!res.ok) throw new Error(data.error || "Somwthing went wrong");

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  });
};
