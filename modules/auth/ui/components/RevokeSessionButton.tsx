"use client";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/betterAuth/client";

interface RevokeSessionButtonProps {
  token: string;
  sessionId: string;
  currentSession: string;
}

export const RevokeSessionButton = ({
  token,
  currentSession,
  sessionId,
}: RevokeSessionButtonProps) => {
  const handleRevoke = () => {
    if (sessionId === currentSession) return;
    toast.promise(
      authClient.revokeSession({
        token: token,
      }),
      {
        error: "Failed to revoke session",
        success: "Session revoked",
        pending: "Revoking session...",
      }
    );
  };
  return (
    <Button
      variant="destructive"
      onClick={handleRevoke}
      disabled={sessionId === currentSession}
    >
      Revoke
    </Button>
  );
};
