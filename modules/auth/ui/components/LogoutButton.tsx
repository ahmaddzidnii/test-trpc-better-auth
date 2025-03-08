"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    setIsPending(true);
    toast.promise(
      logoutMutation.mutateAsync(undefined, {
        onSuccess: () => {
          router.push("/auth/login");
        },
        onError: (error) => {
          console.error("Error logging out", error);
        },
        onSettled: () => {
          setIsPending(false);
        },
      }),
      {
        error: "Error logging out",
        success: "Logged out",
        pending: "Logging out...",
      }
    );
  };
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      className="w-full"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
