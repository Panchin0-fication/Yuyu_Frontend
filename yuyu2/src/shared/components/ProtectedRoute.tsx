import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Profile, type withUserData } from "@shared";

// modes: "logged" to pages that are regired to be logged in. "admin" to pages only accesable by admins
type props = {
  children: ReactNode;
  mode: "logged" | "admin";
};

export default function ProtectedRoute({ children, mode }: props) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = (await Profile(token)) as withUserData;
        if (mode === "logged") {
          setAuthorized(res.success);
        } else {
          setAuthorized(res.success && res.user_data?.role === "Admin");
        }
      } catch (e) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [mode]);

  if (loading) {
    return null;
  }

  if (authorized) {
    return <>{children}</>;
  } else {
    return (
      <Navigate
        to={mode === "logged" ? "/unlogged" : "/inaccessible"}
        replace
      />
    );
  }
}
