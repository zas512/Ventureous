"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";

import { SignInModal } from "./sign-in-modal";

type AuthGateProps = {
  readonly children: ReactNode;
};

/**
 * Client wrapper that auto-opens sign-in modal if unauthenticated.
 * Renders children regardless — the modal is an overlay.
 */
export function AuthGate({ children }: AuthGateProps) {
  const { status } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowModal(true);
    }
  }, [status]);

  return (
    <>
      {children}
      <SignInModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
