import { useQuery } from "@tanstack/react-query";

export const usePosts = ({ postEndPoint }) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(postEndPoint);
        const data = await res.json();

        if (data.error) return [];
        if (!res.ok) throw new Error(data.error || "Something went wrong");

        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  });
};
