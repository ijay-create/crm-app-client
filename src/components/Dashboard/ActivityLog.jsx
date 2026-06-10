const ActivityLog = ({ logs }) => {
  return (
    <div className="log-card">

      <h3>Recent Activity</h3>

      <div className="log-list">

        {logs.map((log) => (
          <div key={log.id} className="log-item">

            <span className="action">
              {log.action}
            </span>

            <span>{log.entity}</span>

            <small>{log.user}</small>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ActivityLog;