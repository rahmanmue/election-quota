import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil access token dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      // Simpan accessToken di localStorage atau state
      localStorage.setItem("accessToken", accessToken);

      // Redirect ke halaman utama atau dashboard
      navigate("/dashboard");
    } else {
      console.error("No access token found");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
