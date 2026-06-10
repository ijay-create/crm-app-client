import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { fetchRevenue } from "../api/finance";

import "../styles/finance.css";

const Finance = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    pendingRevenue: 0,
    overdueRevenue: 0,
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetchRevenue();
      setData(res.data);
    };

    load();
  }, []);

  return (
    <MainLayout>
      <div className="finance">

        <h1>Revenue Dashboard</h1>

        <div className="finance-grid">

          <div className="finance-card">
            <h3>Total Revenue</h3>
            <h2>${data.totalRevenue}</h2>
          </div>

          <div className="finance-card">
            <h3>Pending</h3>
            <h2>${data.pendingRevenue}</h2>
          </div>

          <div className="finance-card">
            <h3>Overdue</h3>
            <h2>${data.overdueRevenue}</h2>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Finance;