"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import Modal from "@/components/modals/Modal";

import {
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createBrowserClient } from "@supabase/ssr";

import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  /*TEST4*/
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);


  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title={"Welcome back"}
      description={"Log in to your account"}
    >
      <Auth
        supabaseClient={supabaseClient}
        magicLink
        redirectTo={`${location.origin}/auth/callback`}
        theme={"dark"}
        providers={["github", "spotify"]}
        providerScopes={{
          spotify:
            "user-top-read,user-library-read,playlist-modify-public,playlist-modify-private",
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
