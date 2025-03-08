"use client";

import { toast } from "react-toastify";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

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
  const revokeMutation = trpc.auth.revokeSessionByToken.useMutation();
  const handleRevoke = () => {
    if (sessionId === currentSession) return;
    toast.promise(revokeMutation.mutateAsync({ token }), {
      error: "Failed to revoke session",
      success: "Session revoked",
      pending: "Revoking session...",
    });
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
