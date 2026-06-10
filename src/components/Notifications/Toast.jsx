import { useNotifications } from "../../context/NotificationContext";
import "../../styles/notifications.css";

const Toast = () => {
  const { notifications } = useNotifications();

  return (
    <div className="toast-container">

      {notifications.slice(0, 5).map((n, i) => (
        <div key={i} className="toast">
          🔔 {n.message}
        </div>
      ))}

    </div>
  );
};

export default Toast;