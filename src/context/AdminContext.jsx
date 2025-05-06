"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("adminside")
    // Check if admin is already authenticated
    const adminToken = localStorage.getItem("admin_token");
    const adminData = localStorage.getItem("admin");
    if (adminToken && adminData ) {
      console.log("main from admin")
      const parsedAdmin = JSON.parse(adminData);
      setAdmin(parsedAdmin);
    } else {
      console.log("helo from null")
      setAdmin(null);
      router.push("/admin")
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    setAdmin(null);
    router.push("/admin"); // Redirect to login page
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};