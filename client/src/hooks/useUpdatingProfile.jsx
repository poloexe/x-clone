import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdatingProfile = (formData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/user/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Updated");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
  });
};
