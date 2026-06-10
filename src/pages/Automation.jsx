import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import API from "../api/axios";

import "../styles/automation.css";

const Automation = () => {
  const [rules, setRules] = useState([]);

  const [form, setForm] = useState({
    name: "",
    trigger: "CUSTOMER_CREATED",
    condition: "status",
    value: "",
    action: "NOTIFY",
  });

  const loadRules = async () => {
    const res = await API.get("/automation");

    setRules(res.data);
  };

  useEffect(() => {
    loadRules();
  }, []);

  const createRule = async () => {
    await API.post("/automation", form);

    loadRules();
  };

  return (
    <MainLayout>
      <div className="automation">

        <h1>Automation Engine</h1>

        <div className="automation-form">

          <input
            placeholder="Rule Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Value (e.g. active or 50)"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: e.target.value,
              })
            }
          />

          <button onClick={createRule}>
            Create Rule
          </button>

        </div>

        <div className="rule-list">

          {rules.map((r) => (
            <div key={r.id} className="rule-card">

              <h3>{r.name}</h3>

              <p>
                {r.trigger} → {r.action}
              </p>

            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  );
};

export default Automation;