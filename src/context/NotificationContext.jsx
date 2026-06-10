import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import socket from "../socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [
        data,
        ...prev,
      ]);
    });

    return () => socket.off("notification");
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);