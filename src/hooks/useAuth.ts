import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type AuthUser = {
  name?: string;
  email?: string;
  username?: string;
  role_id?: number;
  user_id?: number;
  // tambahkan field lain jika perlu
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      // Ambil token dari cookie/localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.replace("/signin");
        return;
      }

      // Validasi token ke server
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
        router.replace("/signin");
      }
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  return { user, loading };
}