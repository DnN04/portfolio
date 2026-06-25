// pages/Work.tsx — Redirect to home page #work section
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Work = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
    setTimeout(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);
  return null;
};

export default Work;
