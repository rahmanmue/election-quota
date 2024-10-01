import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const GoogleCallback = () => {
  const { loginViaGoogle } = useAuth();

  useEffect(() => {
    // Ambil access token dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      loginViaGoogle(accessToken);
    } else {
      console.error("No access token found");
    }
  }, []);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
