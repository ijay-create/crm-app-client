import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../api/axios";


const AI = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/ai/insights");

      setData(res.data);
    };

    load();
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>

        <h1>AI CRM Assistant</h1>

        {data && (
          <>
            <p>Total Customers: {data.total}</p>
            <p>Active: {data.active}</p>
            <p>Leads: {data.leads}</p>
            <p>Inactive: {data.inactive}</p>

            <h3>Insights:</h3>

            {data.insights.map((i, index) => (
              <p key={index}>• {i}</p>
            ))}

            <h3>AI Suggestion:</h3>
            <p>{data.aiSuggestion}</p>
          </>
        )}

      </div>
    </MainLayout>
  );
};

export default AI;