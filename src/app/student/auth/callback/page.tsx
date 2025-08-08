"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Preloader } from "@/components/preloader";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setError("Authentication failed. Please try logging in again.");
        return;
      }
      // Redirect to student dashboard using user id (email as fallback)
      const userId = data.user.id;
      router.replace(`/student/${userId}/dashboard`);
    };
    checkSession();
  }, [router]);

  if (error) {
    return <div className="flex min-h-screen items-center justify-center text-red-500">"Invalid password and email"</div>;
  }
  return <Preloader message="Logging you in..." />;
}
