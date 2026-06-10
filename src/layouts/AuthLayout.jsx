import { motion } from "framer-motion";

import "../styles/auth.css";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <motion.div
        className="auth-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-brand">
          <h1>FlowCRM</h1>

          <p>
            A modern customer relationship platform
            built for fast growing teams.
          </p>
        </div>

        <div className="auth-decoration">
          <div className="circle one"></div>
          <div className="circle two"></div>
        </div>
      </motion.div>

      <motion.div
        className="auth-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-card">
          <div className="auth-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;