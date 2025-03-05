"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { authClient } from "@/utils/betterAuth/client";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsPending(true);
    toast.promise(
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsPending(false);
            router.replace("/auth/login");
          },
          onError(context) {
            console.error("Error logging out", context);
            setIsPending(false);
          },
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
