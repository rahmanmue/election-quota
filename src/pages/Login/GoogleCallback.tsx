import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const GoogleCallback = () => {
  const { loginViaGoogle } = useAuth();
  const [loading, setLoading] = useState(true); // Untuk menangani loading state
  const [error, setError] = useState<null | string>(null); // Untuk menangani error state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      try {
        loginViaGoogle(accessToken);
        setLoading(false); // Matikan loading jika sukses
      } catch (err) {
        setError("Failed to login via Google.");
        setLoading(false); // Matikan loading jika ada error
      }
    } else {
      setError("No access token found");
      setLoading(false);
    }
  }, [loginViaGoogle]);

  if (loading) {
    return <div>Logging in...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // Jika berhasil login, biasanya Anda ingin navigasi ke dashboard
};

export default GoogleCallback;
