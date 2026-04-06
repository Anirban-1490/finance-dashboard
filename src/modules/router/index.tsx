import App from "@/App";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "../auth/login";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { initialFinanceData } from "@/model/data";
import { useFinanceData } from "@/store/finance-data";
import type { FinanceDashboardData } from "@/type";
import { TransactionMain } from "../transactions";
import { Sidebar } from "../sidebar";
// import { authUser } from "@/store/auth";

export function Router() {
  const { setUser, user } = useAuth();
  const seData = useFinanceData((state) => state.setData);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const financeData = localStorage.getItem("financeData");
    if (!financeData) {
      localStorage.setItem("financeData", JSON.stringify(initialFinanceData));
      seData(initialFinanceData as FinanceDashboardData);
    } else {
      seData(JSON.parse(financeData));
    }
    setUser(JSON.parse(user || "null"));
  }, []);

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/dashboard" element={<App />} />
        <Route
          path="/transactions"
          element={user ? <TransactionMain /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
