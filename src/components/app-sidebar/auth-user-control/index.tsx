"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarContent } from "@/components/ui/sidebar";

const AuthUserControls = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // Do not render while session is loading
  if (status !== "authenticated") return null; // Only render for authenticated users

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to home after sign-out
  };

  return (
    <SidebarGroup>
      <SidebarContent>
        <Button variant="outline" onClick={handleSignOut}>
          Sign-out
        </Button>
      </SidebarContent>
    </SidebarGroup>
  );
};

export default AuthUserControls;
